#!/bin/bash -ex

cd /src
npm install --no-audit
npm install gulp
bundle update --bundler
bundle install
bundle update
LC_CTYPE=en_US.UTF-8 LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8 gulp
