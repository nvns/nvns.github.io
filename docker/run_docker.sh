#!/bin/bash

SRCDIR=$(cd $(dirname ${0}) && pwd)

docker \
  run \
  -it \
  -p 4000:4000 \
  --name nvns \
  --rm \
  -v $(dirname ${SRCDIR}):/src \
  -v ${SRCDIR}/_container_startup.sh:/_container_startup.sh:ro \
  nvns
