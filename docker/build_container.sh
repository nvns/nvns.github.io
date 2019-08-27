#!/bin/bash

test -z "${1}" && cache="" || cache="--no-cache"

docker build ${cache} -t nvns .
