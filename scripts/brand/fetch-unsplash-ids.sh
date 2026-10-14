#!/usr/bin/env bash
# Downloads Unsplash CDN photos by id (Unsplash licence: free for commercial use, no permission needed).
# Usage: fetch-unsplash-ids.sh <outdir> id1 id2 ...   (ids like photo-1560448204-e02f11c3d0e2)
out="$1"; shift
for id in "$@"; do
  f="$out/$id.jpg"
  [ -s "$f" ] && continue
  code=$(curl -s -L -m 40 -A "Mozilla/5.0" -o "$f" -w "%{http_code}" "https://images.unsplash.com/$id?w=2400&q=85&fm=jpg&fit=max")
  if [ "$code" != "200" ] || [ "$(stat -c%s "$f")" -lt 20000 ]; then rm -f "$f"; echo "miss $id ($code)"; else echo "ok   $id $(stat -c%s "$f")"; fi
done
