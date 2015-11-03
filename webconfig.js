// Dependency web config
var webpack = require('webpack');

// Define main module
var main = {
	module: './src/js/main.js',
	output: {
		path: __dirname,
		fn: 'main.js'
	}
}

// Export module for development purpose
module.exports.development = {
	debug: true,
	devtool : 'eval',
    entry: main.module,
    output: main.output
}

// Export module for production (release) purpose
module.exports.release = {
	debug: false,
	entry: main.module,
	output: main.output
}