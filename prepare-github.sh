#!/bin/bash

# generate styles.css with tailwind.css , 
npx tailwindcss -i ./docs/tailwind.css -o ./docs/styles.css


# generate metadata.js
cd docs
./generate_metadata.sh
cd ..

# generate docs/bundle.js
npx webpack