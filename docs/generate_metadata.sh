#!/bin/bash

# Output file for metadata.js
OUTPUT_FILE="metadata.js"

# Start of metadata.js content
echo "const filesMetadata = [" > $OUTPUT_FILE

# Iterate over each HTML file in the directory
for file in *.html; do
    # Extract the description from the <title> tag
    description=$(grep -oP '(?<=<title>).*?(?=</title>)' "$file" | head -1)

    # Get the last modified date of the file in readable format
    lastModified=$(date -r "$file" "+%F %H:%M")

    # Escape special characters in description
    description=$(echo "$description" | sed 's/"/\\"/g')

    # Extract the keywords from the <meta name="keywords" content=""> tag
    keywords=$(grep -oP '(?<=<meta name="keywords" content=").*?(?=">)' "$file" | head -1)

    # Extract the keywords from the <meta name="keywords" content=""> tag
    sidebarposition=$(grep -oP '(?<=<meta name="sidebarposition" content=").*?(?=">)' "$file" | head -1)

    keywords=$(echo "$keywords" | sed 's/"/\\"/g')
    sidebarposition=$(echo "$sidebarposition" | sed 's/"/\\"/g')

    # Format data as JavaScript object and append to metadata.js
    echo "    { filename: \"$file\", description: \"$description\", keywords: \"$keywords\", sidebarposition: \"$sidebarposition\", lastModified: \"$lastModified\" }," >> $OUTPUT_FILE
done

# End of metadata.js content
echo "];" >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE
echo "export default filesMetadata;" >> $OUTPUT_FILE  # Add export statement

# Output completion message
echo "Generated $OUTPUT_FILE with metadata for $(ls *.html | wc -l) HTML files."
