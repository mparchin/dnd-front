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
./build.sh $BRANCH --push && \
cd ../ && \
docker compose pull && \
docker compose up -d"
