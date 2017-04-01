
$( document ).ready(function() {

	// Global varialbles
	var socket = io()

	var isTeacher = false,
		tasks = []



	// Helper functions

	function generateItemHTML(task) {
		var tags = ['<li>', `<div class="selectors">
								<div class="clear hidden"><p>></p></div>
								<div class="complete"></div>
								<div class="errors"></div>
								<div class="help"></div>
							</div></li>`],
			content = `<p data='${task.id}'>${task.text}</p>`
		return tags[0] + content + tags[1]
	}

	function updateDOM() {
		// check to see if we're just adding just one item
		if ( ($('#student-list').children().length + 1) === tasks.length) {
			$('#student-list').prepend(generateItemHTML(tasks[tasks.length-1]))

		// if not, re-render the whole damn thing
		} else {
			for (var i = 0; i < tasks.length; i++) {
				$('#student-list').prepend(generateItemHTML(tasks[i]))
			}
		}

		// reset main event listener
		$('.selectors > div').off()
		$('.selectors > div').on('click', function(e) {

			var self = $( this ),
				status = self.attr('class').split(' ')[0],
				oldStatus = self.parent().prev().attr('class') || 'item-clear',
				id = self.parent().prev().attr('data')

			// handle marker clicks
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
		
			// trim old status
			oldStatus = oldStatus.substring(5,oldStatus.length)
			// send information
			socket.emit('mark-item', {was: oldStatus, is: status, id: id})
		})
	}


	// connections

	socket.emit('student-connected')
	console.log('A student has connected.')

	// create a new task

	socket.on('push-item', function(data) {
		tasks = data
		updateDOM()
	})

	// mark a task



})




