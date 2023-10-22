#!/bin/sh
docker buildx install
docker buildx create --use --name buildx-context

if [ "$1" = "production" ] || [ "$2" = "production" ]
  then
    BRANCH_TAG=$1
  else
    BRANCH_TAG="development"
fi

if [ "$1" = "-p" ] || [ "$1" = "--push" ] || [ "$2" = "-p" ] || [ "$2" = "--push" ]
  then
    PUSH_IMAGE="--push"
  else
    PUSH_IMAGE="--load"
fi

DOCKER_HUB="mparchin"
IMAGE_NAME="dnd-front"

docker buildx build "$PUSH_IMAGE" -t "$DOCKER_HUB/$IMAGE_NAME:$BRANCH_TAG" .