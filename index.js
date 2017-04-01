var express = require('express'),
	// start app
	app = express(),
	path = require('path')

// Set public directory
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/student.html')
})

app.get('/teacher', function(req, res){
	res.sendFile(__dirname + '/public/teacher.html')
})

module.exports = app