var express = require('express'),
	path = require('path')
	port = process.env.PORT || 3000

// Start app
var app = express()

// Set up public directory
app.use(express.static(path.join(__dirname, 'public')))

// Root route
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html')
});

app.listen(port, function() {
	console.log('Listening on', port)
})