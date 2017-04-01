///// Global variables

var isTeacher = false,
	name = '',
	title = 'Tic Tac Toe',
	students = ["Gus","Gus","Gus","Gus","Gus"],
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
	for (var i = 0; i < students.length; i++) {
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
	$students.text(students.length)

	// make things green that need to be green.
	// make sure things have styles to represent the data
}

///// Event listeners

$( document ).ready(initDOM)

// create a new task
$newForm.on('submit', function(e) {
	e.preventDefault()

	var text = $newItem.val()
	if (text) {
		$newItem.val('')
		$list.prepend(generateItemHTML(text))

		tasks.push({id: tasks.length, text: text, complete: 0, errors:0, help:0})
	} 
})

///// Sockets

var socket = io()

io.on('connection', function(socket) {
	console.log('a teacher has connected')
})



