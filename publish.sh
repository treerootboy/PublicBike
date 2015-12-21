#!/bin/sh
rm -f build/*
npm run build
git checkout gh-pages
\cp -f ./build/* .
git add --all
git commit -m "update build file"
git push
git checkout master
