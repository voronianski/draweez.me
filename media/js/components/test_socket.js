$(function() {
	// Sockets
	var user_id = Math.random().toString(16).substring(2,15);
	console.log(user_id);

	var clients = {};
	var cursors = {};

	function randomize() {
		var letters = '0123456789ABCDEF'.split('');
		var color = '#';
		for (i = 0; i < 6; i++) {
			color += letters[Math.round(Math.random() * 15)];
		}
		return color
	}

	n = randomize();
	// console.log(n);
	var socket = io.connect('/');

	$(document).bind('mousemove', function(e) {
		socket.emit('move', {
			x: e.pageX,
			y: e.pageY,
			id: user_id
		});
	});

	socket.on('moving', function(data) {
		console.log('on letter');
		if(!(data.id in clients)) { cursors[data.id] = $('<div class="cursor">').appendTo('#cursors'); }

		cursors[data.id].css({
			'left': data.x,
			'top': data.y,
			'background': n
		});

		clients[data.id] = data;
		clients[data.id].updated = $.now();
	});

	setInterval(function() {
		for (ident in clients) {
			if ($.now() - clients[ident].updated > 5000) {
				cursors[ident].remove();
				delete clients[ident];
				delete cursors[ident];
			}
		}
	}, 5000);
});