#!/bin/sh
IMAGE="mparchin/dnd-front"
ADDRESS="dnd-front"
if [ "$1" = "production" ]
  then
    BRANCH=$1
    VITE_API_ADDRESS="https://backend.eldoriantales.com"
  else
    BRANCH="development"
    VITE_API_ADDRESS="http://localhost"
fi
SERVER="91.107.242.150"
ssh $SERVER "cd $ADDRESS && \
git switch $BRANCH && \
git pull && \
docker buildx build -t $IMAGE:$BRANCH --push --build-arg VITE_API_ADDRESS=$VITE_API_ADDRESS ."
