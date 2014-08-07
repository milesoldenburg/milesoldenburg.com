#!/bin/sh
rm -rf prod/*
lessc dev/css/styles.less > dev/css/styles.css
r.js -o app.build.js
rm prod/build.txt prod/css/styles.less
