#!/bin/sh
if [ "$1" = "production" ]
  then
    BRANCH=$1
  else
    BRANCH="development"
fi
SERVER="91.107.242.150"
ssh $SERVER "cd dnd-front && \
git switch $BRANCH && \
git pull && \
cd ../ && \
docker compose up -d --build"
