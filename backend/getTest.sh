#!/usr/bin/env bash
BASE="http://localhost:"
PORT="3001"
endpoint="/books"
echo "testing.. GET /books"
curl -s $BASE$PORT$endpoint | jq . || curl -s $BASE$PORT$endpoint
echo -e "\n--- Done ---"