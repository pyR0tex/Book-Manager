#!/usr/bin/env bash
BASE="http://localhost:"
PORT="3001"

endpoint="/books"

# gets number json elements on the server
number_of_books=$(curl -s "$BASE$PORT$endpoint" | jq length || curl -s "$BASE$PORT$endpoint" | grep -o '{' | wc -l)

# assign book data
new_id_number=$((number_of_books + 1))
title="title$new_id_number"
author="author$new_id_number"
year="year$new_id_number"
genre="genre$new_id_number"

# post data
echo "testing... POST /books"
resp=$(
    curl -s -X POST "$BASE$PORT$endpoint" \
    -H "Content-Type: application/json" \
    -d "{\"title\":\"$title\",\"author\":\"$author\",\"year\":\"$year\",\"genre\":\"$genre\"}"
)
echo "$resp" | jq . || echo "$resp"