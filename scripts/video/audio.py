"""Builds the walkthrough soundtrack: the uploaded voice-over cut into scenes, a quiet ambient music bed and small sound effects.
All music and effects are synthesised here, so there is nothing to license.
Usage: python3 audio.py voice.mp3 out.wav
"""
import json, subprocess, sys, wave
from pathlib import Path
import numpy as np

SR = 44100
HERE = Path(__file__).parent
TL = json.loads((HERE / 'timeline.json').read_text())
rng = np.random.default_rng(7)

def decode(path):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', str(path), '-f', 'f32le', '-ac', '1', '-ar', str(SR), '-'], capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.float32).copy()

scene_start = [s['start'] for s in TL['scenes']]
TOTAL = scene_start[-1] + TL['scenes'][-1]['dur']
N = int((TOTAL + 1.0) * SR)

def at(sc, rel): return scene_start[int(str(sc).lstrip('s'))] + rel
cue_time = {k: at(sc, rel) for k, (sc, rel) in TL['cues'].items()}

def put(buf, sig, t, gain=1.0):
    i = int(t * SR)
    if i < 0 or i >= len(buf): return
    j = min(len(buf), i + len(sig)); buf[i:j] += sig[:j - i] * gain

# ---------- voice
voice_src = decode(sys.argv[1])
voice = np.zeros(N, dtype=np.float32)
for seg in TL['voice']:
    a, b = seg['src']; pre, post = 0.12, 0.10
    s0 = max(0.0, a - pre); s1 = min(len(voice_src) / SR, b + post)
    clip = voice_src[int(s0 * SR):int(s1 * SR)].copy()
    f = int(0.02 * SR); clip[:f] *= np.linspace(0, 1, f); clip[-f:] *= np.linspace(1, 0, f)
    put(voice, clip, at(seg['scene'], seg['at']) - (a - s0))

# speech envelope for ducking the music
win = int(0.05 * SR)
env = np.sqrt(np.convolve(voice ** 2, np.ones(win) / win, mode='same'))
env = np.clip(env / (np.percentile(env, 95) + 1e-9), 0, 1)
k = int(0.35 * SR); env = np.convolve(env, np.ones(k) / k, mode='same'); env = np.clip(env * 1.6, 0, 1)
duck = 1 - 0.55 * env

# ---------- music: soft pad, sparse bells, sub note, reverb
def note(f, dur, vol=1.0, atk=2.5, rel=3.0):
    n = int(dur * SR); t = np.arange(n) / SR
    det = 1 + (rng.random() - .5) * .006
    y = np.sin(2 * np.pi * f * det * t) + .35 * np.sin(2 * np.pi * 2 * f * t + 1) + .12 * np.sin(2 * np.pi * 3 * f * det * t)
    y += .6 * np.sin(2 * np.pi * f * 1.004 * t + 2)
    e = np.minimum(1, t / atk) * np.minimum(1, (dur - t) / rel)
    return (y * e * vol).astype(np.float32)

chords = [[130.81, 164.81, 196.0, 246.94, 293.66], [110.0, 130.81, 164.81, 196.0, 246.94], [87.31, 110.0, 130.81, 164.81, 220.0], [98.0, 123.47, 146.83, 164.81, 220.0]]
music = np.zeros(N, dtype=np.float32)
clen = 10.4; t = -1.0; ci = 0
while t < TOTAL + 1:
    for f in chords[ci % 4]: put(music, note(f, clen + 3.0, .16), max(0, t))
    put(music, note(chords[ci % 4][0] / 2, clen + 2.0, .22, 3, 3), max(0, t))
    t += clen; ci += 1
bell_notes = [523.25, 587.33, 659.25, 783.99, 880.0, 987.77]
bt = 3.5
while bt < TOTAL - 3:
    f = bell_notes[rng.integers(len(bell_notes))]; n = int(3.2 * SR); tt = np.arange(n) / SR
    y = (np.sin(2 * np.pi * f * tt) + .25 * np.sin(2 * np.pi * f * 2.01 * tt)) * np.exp(-tt * 1.6) * np.minimum(1, tt / .01)
    put(music, y.astype(np.float32), bt, .06); bt += 2.6 + rng.random() * 2.4
# reverb
ir_n = int(2.2 * SR); ir = rng.standard_normal(ir_n) * np.exp(-np.arange(ir_n) / SR * 2.4); ir[0] = 0
def reverb(x, ir, wet=.5):
    n = len(x) + len(ir); nfft = 1 << (n - 1).bit_length()
    y = np.fft.irfft(np.fft.rfft(x, nfft) * np.fft.rfft(ir, nfft), nfft)[:len(x)]
    return x * (1 - wet * .5) + y * wet * (np.abs(x).max() / (np.abs(y).max() + 1e-9)) * .55
music = reverb(music, ir)
fi = int(3 * SR); fo = int(4 * SR); end_i = int((TOTAL + .5) * SR)
music[:fi] *= np.linspace(0, 1, fi); music[end_i - fo:end_i] *= np.linspace(1, 0, fo); music[end_i:] = 0
music = music / (np.abs(music).max() + 1e-9) * .5
music *= duck.astype(np.float32)

# ---------- sound effects
def tt(d): return np.arange(int(d * SR)) / SR
def bell(f, d=1.0, vol=1.0):
    t = tt(d); y = sum(a * np.sin(2 * np.pi * f * r * t) * np.exp(-t * dcy) for r, a, dcy in [(1, 1, 3.5), (2.76, .35, 6), (5.4, .15, 9)])
    return (y * np.minimum(1, t / .003) * vol).astype(np.float32)
def lowpass(x, n): return np.convolve(x, np.ones(n) / n, mode='same')
def noise_whoosh(d, f0, f1, vol):
    t = tt(d); x = rng.standard_normal(len(t)); y = lowpass(x, 14) - lowpass(x, 120)
    sw = np.sin(np.pi * t / d) ** 2; return (y * sw * vol / (np.abs(y).max() + 1e-9)).astype(np.float32)
def tick(vol=1.0, pitch=1.0):
    t = tt(.05); y = (rng.standard_normal(len(t)) * .5 + np.sin(2 * np.pi * 2400 * pitch * t)) * np.exp(-t * 140); return (y * vol * .5).astype(np.float32)
def pop(f, d=.2, vol=1.0):
    t = tt(d); y = (np.sin(2 * np.pi * f * t) + .3 * np.sin(2 * np.pi * 2 * f * t)) * np.exp(-t * 20) * np.minimum(1, t / .004); return (y * vol).astype(np.float32)
def seq(parts, total):
    out = np.zeros(int(total * SR), np.float32)
    for sig, off in parts:
        i = int(off * SR); j = min(len(out), i + len(sig)); out[i:j] += sig[:j - i]
    return out
SFX = {
    'tick': lambda: tick(.7, .9 + rng.random() * .25),
    'typing': lambda: seq([(pop(900 + i * 60, .09, .25), i * .1) for i in range(3)], .4),
    'rise': lambda: noise_whoosh(.5, 0, 0, .35),
    'swipe': lambda: noise_whoosh(.55, 0, 0, .5),
    'click': lambda: seq([(pop(1500, .06, .55), 0), (tick(.6), 0)], .08),
    'send': lambda: seq([(noise_whoosh(.4, 0, 0, .4), 0), (pop(1175, .3, .45), .1)], .5),
    'pop_in': lambda: seq([(pop(880, .2, .6), 0), (pop(1318, .25, .6), .09)], .4),
    'pop_out': lambda: seq([(pop(700, .16, .55), 0), (pop(1050, .16, .35), .05)], .25),
    'chime': lambda: seq([(bell(1318.5, 1.1, .55), 0), (bell(1568, 1.1, .5), .16), (bell(1975, 1.0, .4), .32)], 1.6),
    'ping': lambda: seq([(bell(1396.9, 1.2, .6), 0), (bell(2093, 1.2, .5), .14)], 1.6),
    'soft': lambda: bell(880, .8, .45),
    'success': lambda: seq([(bell(1046.5, 1.0, .5), 0), (bell(1568, 1.2, .55), .18)], 1.5),
    'star': lambda: pop(1568, .12, .35),
}
sfx = np.zeros(N, dtype=np.float32)
def place(name, t, g=1.0):
    y = np.asarray(SFX[name](), dtype=np.float32); put(sfx, y, t, g)
for cue, name in TL['sfx']: place(name, cue_time[cue])
for sc, rel, name in TL['extra_sfx']: place(name, at(sc, rel))
for key, v in TL['type'].items():
    t0 = at(v['scene'], v['t'])
    for i, ch in enumerate(v['text']):
        if ch != ' ': place('tick', t0 + i / v['cps'], .8 + rng.random() * .4)

# ---------- mix
mix = voice * 1.0 + music * .55 + sfx * .5
mix = np.tanh(mix * 1.15) / 1.15
mix = mix[:int((TOTAL + .2) * SR)]
pcm = (np.clip(mix, -1, 1) * 32767).astype('<i2')
with wave.open(sys.argv[2], 'wb') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
print('audio', round(len(mix) / SR, 2), 's')
