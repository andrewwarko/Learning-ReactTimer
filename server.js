var express = require('express');

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
