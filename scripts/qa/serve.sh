#!/usr/bin/env bash
# Restart the production server on port 3100 (used by QA scripts). Usage: scripts/qa/serve.sh [ENV=VAL ...]
cd "$(dirname "$0")/../.."
if [ -f /tmp/fw-next.pid ]; then kill "$(cat /tmp/fw-next.pid)" 2>/dev/null; sleep 1; fi
for kv in "$@"; do export "$kv"; done
nohup node_modules/.bin/next start -p 3100 > /tmp/next.log 2>&1 &
echo $! > /tmp/fw-next.pid
for i in $(seq 1 20); do curl -s -o /dev/null localhost:3100/ && exit 0; sleep 0.5; done
echo "server did not start"; exit 1
