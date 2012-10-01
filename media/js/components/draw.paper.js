paper.install(window);

$(function() {
    paper.setup('draweez');

    var sticker;
    var path;
	var socket = io.connect('/');
	var user_id = Math.random().toString(16).substring(2,15);
	var clients = {};
	var cursors = {};
    var sentPath = {};

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

    function onMouseDown(e) {
    	path = new Path();
    	path.style = mainStyle;
    	path.selected = true;

        sentPath = {
            user: user_id,
            start: e.point,
            moves: []
        }
        //console.log(e.point);
    }

    function onMouseDrag(e) {
        path.add(e.point);

        sentPath.moves.push({
            x: e.point.x,
            y: e.point.y
        });
        //console.log(sentPath);
    	socket.emit('move', JSON.stringify(sentPath));
        sentPath.moves = new Array();
    }

    function onMouseUp(e) {
    	path.selected = false;
    	path.simplify();
    }

    socket.on('moving', function(data) {
    	externalDraw(JSON.parse(data));
    });

    var external_path = {};
    function externalDraw(data) {
        //console.log(data.user);
        var path = external_path[data.user];

        if (!path) {
            external_path[data.user] = new Path();
            path = external_path[data.user];

            var startPoint = new Point(data.start.x, data.start.y);
            path.strokeColor = '#f00';
            path.strokeWidth = '10';
            path.strokeCap = 'round';
            path.add(startPoint);
        }

        var paths = data.moves;

        for (var i = 0; i < paths.length; i++) {
            console.log('loop goes');
            path.add(paths[i].x, paths[i].y);
        }

        path.smooth();
    }

    sticker.onMouseDown = onMouseDown;
    sticker.onMouseDrag = onMouseDrag;
    sticker.onMouseUp = onMouseUp;
});