#!/bin/bash

# JSON file path
JSON_FILE="subthemes.json"

# Output files
METADATA_FILE="metadata.js"
THEME_MAP_FILE="themeMap.js"

# Generate metadata.js
generate_metadata_js() {
  echo "const filesMetadata = [" > "$METADATA_FILE"
  
  for file in *.html; do
    extract_metadata "$file" >> "$METADATA_FILE"
  done
  
  echo "];" >> "$METADATA_FILE"
  echo "export default filesMetadata;" >> "$METADATA_FILE"
}

# Function to extract metadata from HTML files
extract_metadata() {
  local file="$1"
  local filename=$(basename "$file")
  local description=$(grep -oP '(?<=<title>).*?(?=</title>)' "$file" | head -1 | sed 's/"/\\"/g')
  local keywords=$(grep -oP '(?<=<meta name="keywords" content=").+?(?=")' "$file")
  local sidebarposition=$(grep -oP '(?<=<meta name="sidebarposition" content=").+?(?=")' "$file")
  local lastModified=$(date -r "$file" "+%F %H:%M")
  local subthemekey=$(grep -oP '(?<=<meta name="subthemekey" content=").+?(?=")' "$file")

  # Get theme and subtheme descriptions from JSON
  local theme=$(jq -r --arg subthemekey "$subthemekey" '.themes | to_entries[] | select(.value.subthemes[$subthemekey] != null) | .key' "$JSON_FILE")
  local subtheme=$(jq -r --arg subthemekey "$subthemekey" '.themes | to_entries[] | select(.value.subthemes[$subthemekey] != null) | .value.subthemes[$subthemekey]' "$JSON_FILE")

  if [ -z "$theme" ]; then
    theme="Unknown"
  fi

  if [ -z "$subtheme" ]; then
    subtheme="null"
  fi

  echo "    { filename: \"$filename\", description: \"$description\", themekey: \"$theme\", subthemekey: \"$subthemekey\", theme: \"$theme\", subtheme: \"$subtheme\", keywords: \"$keywords\", sidebarposition: \"$sidebarposition\", lastModified: \"$lastModified\" },"
}

# Generate themeMap.js
generate_theme_map_js() {
  echo "const themeMap = new Map();" > "$THEME_MAP_FILE"

  # Read themes and subthemes in order from JSON file
  jq -c '.themes | to_entries[]' "$JSON_FILE" | while read -r themeEntry; do
    theme=$(echo "$themeEntry" | jq -r '.key')
    subthemes=$(echo "$themeEntry" | jq -c '.value.subthemes | to_entries[]')

    echo "themeMap.set('$theme', new Map());" >> "$THEME_MAP_FILE"

    echo "$subthemes" | while read -r subthemeEntry; do
      subthemekey=$(echo "$subthemeEntry" | jq -r '.key')
      subtheme=$(echo "$subthemeEntry" | jq -r '.value')

      echo "themeMap.get('$theme').set('$subthemekey', '$subtheme');" >> "$THEME_MAP_FILE"
    done
  done

  echo "export default themeMap;" >> "$THEME_MAP_FILE"
}

# Run the script
generate_metadata_js
generate_theme_map_js

echo "Metadata extraction and themeMap generation complete."
