var express = require('express'),
	// start app
	app = express(),
	path = require('path'),
	http = require('http').Server(app),
	io = require('socket.io')(http),
	port = process.env.PORT || 3000

// Set public directory
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/student.html')
})

app.get('/teacher', function(req, res){
	res.sendFile(__dirname + '/public/teacher.html')
})

// Sockets

io.on('connection', function(socket) {
	console.log('a user connected')
})

http.listen(port, function() {
	console.log('Listening on', port)
})