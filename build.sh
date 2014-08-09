#!/bin/sh

# Empty prod dir except for README.md
find prod ! -name README.md -type d -mindepth 1 | xargs rm -rf
find prod ! -name README.md -type f | xargs rm

# Compiles LESS
lessc dev/css/styles.less > dev/css/styles.css

# Build App
r.js -o app.build.js

# Remove extra files
rm prod/build.txt prod/css/styles.less
