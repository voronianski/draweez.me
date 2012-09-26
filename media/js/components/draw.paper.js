paper.install(window);

$(function() {
    paper.setup('draweez');

    var sticker;
    var path;
	var socket = io.connect('/');
	var user_id = Math.random().toString(16).substring(2,15);
	var clients = {};
	var cursors = {};

    var mainStyle = {
    	strokeColor: '#f80',
    	strokeWidth: 10,
    	strokeCap: 'round'
    }

    var myPath = new Path.Circle([100, 100], 20);
    myPath.strokeColor = '#ddd';
    myPath.fillColor = '#f80';
    view.draw();

    sticker = new Tool();
    sticker.fixedDistance = 10;

    function onMouseDown() {
    	path = new Path();
    	path.style = mainStyle;
    	path.selected = true;
    }

    function onMouseDrag(e) {
    	socket.emit('move', {
    		x: e.point.x,
    		y: e.point.y,
    		id: user_id
    	});
    	//console.log(e.point.x);
    	path.add(e.point);
    }

    function onMouseUp(e) {
    	path.selected = false;
    	path.simplify();
    }

    socket.on('moving', function(data) {
    	console.log(data);
    	externalDraw(data);
    })

    function externalDraw(data) {
    	var path = clients[data.id];

    	//if (!path) {
    	//console.log(clients[data.id]);
    	clients[data.id] = new Path();
    	path = clients[data.id];
    	console.log(path);

    	points = new Point(data.x, data.y);
    	path.style = mainStyle;

    	path.add(points);
    	//}
    }

    sticker.onMouseDown = onMouseDown;
    sticker.onMouseDrag = onMouseDrag;
    sticker.onMouseUp = onMouseUp;
});