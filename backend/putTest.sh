#!/usr/bin/env bash
BASE="http://localhost:"
PORT="3001"

book_id=1
endpoint="/books/$book_id"
title="Testing PUT"

echo "testing... PUT $endpoint"
resp=$(
    curl -s -X PUT $BASE$PORT$endpoint \
    -H "Content-Type: application/json" \
    -d "{\"title\":\"$title\"}"
)
echo "$resp" | jq . || echo "$resp"