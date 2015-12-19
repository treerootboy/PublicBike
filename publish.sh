#!/bin/sh
npm run build
mv index.html aindex.html
mv bundle.js abundle.js
git checkout gh-pages
mv aindex.html index.html
mv abundle.js bundle.js
git add --all
git commit -m "update build file"
git push
git checkout master
