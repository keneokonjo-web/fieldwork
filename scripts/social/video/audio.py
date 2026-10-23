"""Soundtrack for an ad video: the voice-over, an upbeat original music bed (synthesised) and small sound effects.
Usage: python3 audio.py <v1|v2|v3> out.wav [voice-dir]"""
import json, subprocess, sys, wave
from pathlib import Path
import numpy as np

SR = 44100
HERE = Path(__file__).parent
which, out = sys.argv[1], sys.argv[2]
voice_dir = Path(sys.argv[3]) if len(sys.argv) > 3 else Path('/tmp/fw-audio')
meta = json.loads(subprocess.run(['node', '-e', f"import('{(HERE / (which + '.mjs')).as_posix()}').then(m=>console.log(JSON.stringify({{voice:m.voice,total:m.total,sfx:m.sfx}})))"], capture_output=True, text=True, check=True).stdout)
TOTAL = meta['total']; N = int((TOTAL + .5) * SR); LEAD = 0.3
rng = np.random.default_rng(11)
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', str(voice_dir / meta['voice']), '-f', 'f32le', '-ac', '1', '-ar', str(SR), '-'], capture_output=True, check=True).stdout
vsrc = np.frombuffer(raw, dtype=np.float32).copy()
voice = np.zeros(N, np.float32); i = int(LEAD * SR); voice[i:i + len(vsrc)] = vsrc[:N - i]

def put(buf, sig, t, g=1.0):
    i = int(t * SR)
    if i < 0 or i >= len(buf): return
    j = min(len(buf), i + len(sig)); buf[i:j] += sig[:j - i] * g

def box(x, n):
    c = np.cumsum(np.concatenate([[0], x])); h = n // 2; i = np.arange(len(x)); lo = np.clip(i - h, 0, len(x)); hi = np.clip(i + h + 1, 0, len(x)); return (c[hi] - c[lo]) / np.maximum(hi - lo, 1)
env = np.sqrt(box(voice ** 2, int(.05 * SR))); env = np.clip(env / (np.percentile(env, 95) + 1e-9), 0, 1)
env = np.clip(box(env, int(.3 * SR)) * 1.6, 0, 1); duck = (1 - .55 * env).astype(np.float32)

def tt(d): return np.arange(int(d * SR)) / SR
def tone(f, d, vol, decay, harm=(1, .3, .1), atk=.003):
    t = tt(d); y = sum(a * np.sin(2 * np.pi * f * (i + 1) * t) for i, a in enumerate(harm)) * np.exp(-t * decay) * np.minimum(1, t / atk); return (y * vol).astype(np.float32)
def seq(parts, total):
    o = np.zeros(int(total * SR), np.float32)
    for sig, off in parts:
        i = int(off * SR); j = min(len(o), i + len(sig)); o[i:j] += sig[:j - i]
    return o
def bell(f, d=1.0, vol=1.0):
    t = tt(d); y = sum(a * np.sin(2 * np.pi * f * r * t) * np.exp(-t * dc) for r, a, dc in [(1, 1, 3.5), (2.76, .35, 6), (5.4, .15, 9)]); return (y * np.minimum(1, t / .003) * vol).astype(np.float32)

# ---------- music: bright and bouncy, about 122 bpm
BPM = 122; BEAT = 60 / BPM
def kick(vol=1.0):
    t = tt(.28); f = 55 + 90 * np.exp(-t * 28); ph = 2 * np.pi * np.cumsum(f) / SR; return (np.sin(ph) * np.exp(-t * 11) * vol).astype(np.float32)
def hat(vol=1.0):
    t = tt(.04); x = rng.standard_normal(len(t)); y = (x - np.convolve(x, np.ones(5) / 5, mode='same')) * np.exp(-t * 110); return (y * vol).astype(np.float32)
def pluck(f, vol=1.0): return tone(f, .45, vol, 10, (1, .45, .18))
def bass(f, vol=1.0): return tone(f, .5, vol, 5, (1, .25))
prog = [dict(arp=[523.25, 659.25, 783.99, 1046.5], pad=[261.63, 329.63, 392.0], bass=65.41), dict(arp=[392.0, 493.88, 587.33, 783.99], pad=[196.0, 246.94, 293.66], bass=98.0), dict(arp=[440.0, 523.25, 659.25, 880.0], pad=[220.0, 261.63, 329.63], bass=110.0), dict(arp=[349.23, 440.0, 523.25, 698.46], pad=[174.61, 220.0, 261.63], bass=87.31)]
pat = [0, 2, 1, 3, 2, 1, 3, 2]
music = np.zeros(N, np.float32); t = 0.0; bar = 0
while t < TOTAL + 1:
    ch = prog[(bar // 2) % 4]
    if bar % 2 == 0:
        for f in ch['pad']: put(music, tone(f, 2 * 4 * BEAT + .6, .09, 0, (1, .25), atk=.4) * np.minimum(1, (tt(2 * 4 * BEAT + .6)[::-1] / .6)).astype(np.float32), t)
    for b in range(4):
        put(music, kick(.55), t + b * BEAT)
        put(music, hat(.18), t + b * BEAT + BEAT / 2)
        put(music, bass(ch['bass'] * (2 if b % 2 else 1), .22), t + b * BEAT + (BEAT / 2 if b % 2 else 0))
    for i, idx in enumerate(pat): put(music, pluck(ch['arp'][idx], .075 if i % 2 == 0 else .05), t + i * BEAT / 2)
    t += 4 * BEAT; bar += 1
fi = int(.6 * SR); fo = int(2.5 * SR); end_i = int((TOTAL + .3) * SR)
music[:fi] *= np.linspace(0, 1, fi); music[end_i - fo:end_i] *= np.linspace(1, 0, fo); music[end_i:] = 0
music = music / (np.abs(music).max() + 1e-9) * .5 * duck

# ---------- sound effects (soft, no whooshes)
def tick(): t = tt(.07); return ((np.sin(2 * np.pi * 330 * (.9 + rng.random() * .25) * t) + .2 * rng.standard_normal(len(t)) * np.exp(-t * 120)) * np.exp(-t * 75) * .5).astype(np.float32)
SFX = {
    'tick': tick,
    'click': lambda: seq([(tone(1500, .06, .55, 60), 0)], .08),
    'pop_in': lambda: seq([(tone(880, .2, .6, 20, (1, .3)), 0), (tone(1318, .25, .6, 20, (1, .3)), .09)], .4),
    'pop_out': lambda: seq([(tone(700, .16, .55, 20, (1, .3)), 0), (tone(1050, .16, .35, 20, (1, .3)), .05)], .25),
    'ping': lambda: seq([(bell(1396.9, 1.2, .6), 0), (bell(2093, 1.2, .5), .14)], 1.6),
    'success': lambda: seq([(bell(1046.5, 1.0, .5), 0), (bell(1568, 1.2, .55), .18)], 1.5),
    'chime': lambda: seq([(bell(1318.5, 1.1, .55), 0), (bell(1568, 1.1, .5), .16), (bell(1975, 1.0, .4), .32)], 1.6),
}
sfx = np.zeros(N, np.float32)
for t0, name in meta['sfx']: put(sfx, np.asarray(SFX[name](), np.float32), t0)

mix = voice + music * .6 + sfx * .26
mix = (np.tanh(mix * 1.15) / 1.15)[:int((TOTAL + .3) * SR)]
pcm = (np.clip(mix, -1, 1) * 32767).astype('<i2')
with wave.open(out, 'wb') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
print('audio', which, round(len(mix) / SR, 2), 's')
