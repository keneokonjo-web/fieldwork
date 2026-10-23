# Automations walkthrough video

Frame-by-frame render (exact timing, 1080p), then the soundtrack, then mux.

1. `timeline.json` is the single source of truth for scene lengths, voice placement, cues and sound effects.
2. `node build-timeline.mjs` writes `timeline.js` for the HTML scene.
3. `node render.mjs /tmp/silent.mp4` renders `walkthrough.html` at 30 fps (about 4 minutes).
4. `python3 audio.py voice.mp3 /tmp/mix.wav` cuts the single ElevenLabs file into scenes and adds the synthesised music and effects.
5. Normalise and mux: `ffmpeg -i mix.wav -af loudnorm=I=-16:TP=-2.5 mix_norm.wav`, then `ffmpeg -i silent.mp4 -i mix_norm.wav -c:v libx264 -preset slow -crf 21 -c:a aac -b:a 160k final.mp4`, and a VP9/Opus WebM copy. Outputs live in `public/media/`.

If the voice-over is regenerated, update the `voice[].src` times in `timeline.json` (find them with `ffmpeg -af silencedetect`).
