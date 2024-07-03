const path = require('path');

module.exports = {
    mode: 'production', // or 'development'
    entry: './docs/script.js', // Entry point of your JavaScript files
    output: {
        filename: 'bundle.js', // Output filename after bundling
        path: path.resolve(__dirname, 'docs') // Output directory (docs folder)
    }
};
