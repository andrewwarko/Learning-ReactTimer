var express = require('express');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');
//var fs = require('fs');

// Create our app
var app = express();

// Heroku
const PORT = process.env.PORT || 3000;

// Request, response, and what to call when finished.
// Fix for openweathermap not allowing https.
app.use(function (req, res, next) {
	if (req.headers['x-forwarded-proto'] === 'https') {
		res.redirect('http://' + req.hostname + req.url);
	} else {
		next();
	}
});

// Tells express which folder we want to serve.
// App.use lets you add functionality to your application.
app.use(express.static('public'));


// Takes 2 arguments, the port and a function that is called when the server is up.
app.listen(PORT, function() {
	console.log('Express server is up on port ' + PORT);
});

// We start a webpack-dev-server with our config

var compiler = webpack(config, function(err, stats) {
	//fs.writeFile("stats.json", JSON.stringify(stats.toJson(), null, 4));
	if (err) {
		console.log(err);
	}
	// else {
	// 	var minorErrors = stats.toJson().errors;
	//
	// 	if (minorErrors.length > 0) {
	// 		console.log("ERROR DETECTED");
	// 	} else {
	// 		console.log("BUNDLE COMPILED SUCCESSFULLY");
	// 	}
	//
	// 	//console.log(stats.toJson().errors);
	// }
	//
	// stats = '';

});

new WebpackDevServer(compiler, {
	hot: true,
	contentBase: "http://localhost:3000/",
	noInfo: false,
	quiet: false,
	compress: false,
	stats: {colors: true, chunks: false},
	historyApiFallback: true,
	proxy: {
		"*": "http://localhost:3000"
	}
}, function () {
	console.log("I AM HERE");
}).listen(3001, 'localhost', function () {
	console.log('');
	console.log('Hot Reload Server listening on localhost:3001');
	console.log('You can access the hot reloading website at http://localhost:3001/webpack-dev-server/');
	console.log('');
});
