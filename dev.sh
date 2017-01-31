#!/usr/bin/env bash

# This script takes one optional argument
# - container port (default: 8033)
SERVICE_PORT=${1:-8033}

SERVICE_NAME="guessy-server"

# Build the image
docker build -t jkulak/$SERVICE_NAME .

# Run the container (remove if exists)
if [ ! "$(docker ps -q -f name=$SERVICE_NAME)" ]; then
    if [ "$(docker ps -aq -f status=exited -f name=$SERVICE_NAME)" ]; then
        # cleanup
        docker rm $SERVICE_NAME
    elif
        [ "$(docker ps -aq -f status=created -f name=$SERVICE_NAME)" ]; then
        # cleanup
        docker rm $SERVICE_NAME
    fi
    # run your container
    docker run --rm -ti --name $SERVICE_NAME -v $(pwd):/app -p $SERVICE_PORT:8033 -p 35729:35729 jkulak/$SERVICE_NAME sh -l
fi
