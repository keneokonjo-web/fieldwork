#!/usr/bin/env bash
# Renders and muxes one ad video in all three shapes: scripts/social/video/make.sh <v1|v2|v3> <outdir>
set -e
cd "$(dirname "$0")/../../.."
W=$1; OUT=$2; mkdir -p "$OUT" /tmp/fw-vid
NAME=$(node -e "import('./scripts/social/video/$W.mjs').then(m=>console.log(m.name))")
python3 scripts/social/video/audio.py "$W" "/tmp/fw-vid/$W.wav"
ffmpeg -y -loglevel error -i "/tmp/fw-vid/$W.wav" -af "loudnorm=I=-14:TP=-1.5:LRA=9" -ar 44100 "/tmp/fw-vid/$W.norm.wav"
for AR in 9x16 1x1 16x9; do
  node scripts/social/video/render.mjs "$W" "$AR" "/tmp/fw-vid/$W-$AR.silent.mp4"
  ffmpeg -y -loglevel error -i "/tmp/fw-vid/$W-$AR.silent.mp4" -i "/tmp/fw-vid/$W.norm.wav" -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 192k -shortest "$OUT/$NAME-$AR.mp4"
done
echo "finished $W"
