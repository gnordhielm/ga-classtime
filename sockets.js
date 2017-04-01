var io = require('socket.io')()

io.on('connection', function(socket) {

	// Basic setup

	socket.on('teacher-connected', function() {
		io.emit('teacher-connected')
		console.log('A teacher has connected.')
	})

	socket.on('student-connected', function() {
		io.emit('student-connected')
		console.log('A student has connected.')
	})

	// Task creation/updates

	socket.on('push-item', function(data) {
		io.emit('push-item', data)
	})

	socket.on('mark-item', function(data) {
		io.emit('mark-item', data)
	})

	// Disconnections

	socket.on('disconnect', function() {
		io.emit('disconnect')
	})

})

module.exports = io