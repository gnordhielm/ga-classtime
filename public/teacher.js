///// Global variables

var isTeacher = true,
	name = '',
	title = 'Tic Tac Toe',
	studentCount = 0,
	tasks = []

var $newItem = $('#new-item'),
	$newForm = $('#new-form'),
	$list = $('#full-list'),
	$title = $('#main-title'),
	$students = $('#students-count')

///// Helper functions

function generateItemHTML(text) {
	var tags = ['<li><div class="bar">', `</div><p>${text}</p></li>`],
		content = ''
	for (var i = 0; i < studentCount; i++) {
		content += '<div class="notch"></div>'
	}
	return tags[0] + content + tags[1]
}

function initDOM(){
	$title.text(title)
	updateDOM()
}

function updateDOM() {
	// update student count
	$students.text(studentCount)

	// make things green that need to be green.
	// make sure things have styles to represent the data
}



$( document ).ready(function() {
	// setup
	initDOM()
	var socket = io()

	// connections

	socket.emit('teacher-connected')
	console.log('A teacher has connected.')

	socket.on('student-connected', function() {
		studentCount++
		updateDOM()
	})


	// create a new task
	$newForm.on('submit', function(e) {
		e.preventDefault()

		var text = $newItem.val()
		if (text && studentCount) {
			$list.prepend(generateItemHTML(text))

			tasks.push({id: tasks.length, text: text, complete: 0, errors:0, help:0})
			socket.emit('push-item', tasks)

			$newItem.val('')
		} else if (!studentCount) {
			$students.parent().css({color: '#f27076'})
			setTimeout(function() {
				$students.parent().attr('style', '')
			}, 200)
		}
	})

	// update a task

	socket.on('mark-item', function(data) {
		console.log('mark item', data)
		// actually do something with the fucking data.
		updateDOM()
	})

	// disconnections

	socket.on('disconnect', function() {
		studentCount--
		updateDOM()
	})

})




