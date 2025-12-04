#!/usr/bin/env bash
BASE="http://localhost:"
PORT="3001"

endpoint="/books"
# gets number json elements on the server
book_id=$(curl -s "$BASE$PORT$endpoint" | jq length || curl -s "$BASE$PORT$endpoint" | grep -o '{' | wc -l)

endpoint="/books/$book_id"

echo "testing... DELETE $endpoint"
curl -s -X DELETE $BASE$PORT$endpoint | jq . || curl -s $BASE$PORT$endpoint