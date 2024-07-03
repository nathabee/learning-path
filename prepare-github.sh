#!/bin/bash

# generate metadata.js
cd docs
./generate_metadata.sh
cd ..

# generate docs/bundle.js
npx webpack