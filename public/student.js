// Global varialbles

var tasks = []

// Helper functions

function generateItemHTML(text) {
	var tags = ['<li>', `<div class="selectors">
							<div class="clear hidden"><p>></p></div>
							<div class="complete"></div>
							<div class="errors"></div>
							<div class="help"></div>
						</div></li>`],
		content = `<p>${text}</p>`
	return tags[0] + content + tags[1]
}

// Event-driven functions

// handle new items

$('#student-list').prepend(generateItemHTML('New Item'))

// completion markers
$('.selectors > div').on('click', function(e) {
	var self = $( this ),
		status = self.attr('class').split(' ')[0]
	// on click, make the p the color that was clicked,
	self.parent().prev().attr('class','')
	self.parent().prev().addClass('item-'+status)

	if (status === 'complete') {
		self.addClass('hidden')
		self.prev().removeClass('hidden')
		self.next().removeClass('selected').addClass('hidden')
		self.next().next().removeClass('selected').addClass('hidden')
	} else if(status === 'errors') {
		self.addClass('selected')
		self.next().removeClass('selected')
	} else if(status === 'help') {
		self.addClass('selected')
		self.prev().removeClass('selected')
	} else {
		self.addClass('hidden')
		self.next().removeClass('hidden')
		self.next().next().removeClass('hidden')
		self.next().next().next().removeClass('hidden')
	}

})


///// Sockets

var socket = io()

io.on('connection', function(socket) {
	console.log('a student has connected')
})



