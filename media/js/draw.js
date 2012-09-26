/*
 *  Paperscript drawing app
 *
 *	(c)2012 http://draweez.me/, http://pixelhunter.me/
 */

var circle = new Path.Circle(new Point(100, 100), 50);
circle.strokeColor = "#f80";
circle.selected = true;

var myPath = new Path();
myPath.strokeColor = "#f00";

myPath.add(new Point(50, 0), new Point(100, 50), new Point(150, 20));
myPath.insert(1, new Point(50, 25));
myPath.closed = true;
myPath.smooth();

var rectangle = new Rectangle(new Point(250, 250), new Point(150, 100));
var cornerSize = new Size(20, 20);
var rectPath = new Path.RoundRectangle(rectangle, cornerSize);
rectPath.fillColor = '#f80';
rectPath.strokeColor = '#f00'

var triangle = new Path.RegularPolygon(new Point(500, 100), 3, 50);
triangle.fillColor = '#fc0';

var check = new Path();
check.add(new Point(430, 200), new Point(450, 240), new Point(500, 100));
check.strokeColor = '#f00';
check.strokeWidth = 10;
check.strokeCap = 'round';
check.strokeJoin = 'bevel';

myPath.style = check.style;

var myStyle = {
	strokeColor: '#fc0',
	strokeWidth: 10
}

circle.style = myStyle;
circle.flatten(30);

/*
// drawing with simplify()
var path;

function onMouseDown() {
	path = new Path();
	path.style = myStyle;
	path.strokeCap = 'round';
	path.selected = true;
}

function onMouseDrag(e) {
	path.add(e.point);

}

function onMouseUp() {
	path.simplify();
	//path.flatten(20);
	//path.smooth();
	path.selected = false;
}
*/

/*
var path;

function onMouseDown() {
	path = new Path();
	path.strokeColor = '#f00';
}

function onMouseDrag(e) {
	path.add(e.point);	
}

function onMouseUp(e) {
	var bigCircle = new Path.Circle(e.point, 20);
	bigCircle.style = myStyle;
	path.simplify();
}
*/

/* delta
tool.fixedDistance = 10;

function onMouseDown(e) {
	console.log(e.count);
} 

function onMouseDrag(e) {
 	var radius = e.delta.length;
 	cpath = new Path.Circle(e.middlePoint, radius);
 	cpath.fillColor = '#f00';
}
*/

/* brush with strokes
tool.fixedDistance = 30;
var path;
var strokeEnds = 6;

function onMouseDown(e) {
	path = new Path();
	path.fillColor = '#f80';
	//path.add(e.point);
	//path.selected = true;
}

var lastPoint;
function onMouseDrag(e) {
	if (e.count == 1) {
		addStrokes(e.middlePoint, e.delta * -1);
	} else {
	var step = e.delta / 2;
	step.angle += 90;
	var left = e.middlePoint + step;
	var right = e.middlePoint - step;

	var line = new Path();
	line.strokeColor = '#f00';
	line.add(left);
	line.add(right);

	path.add(left);
	path.insert(0, right);
	}
	path.smooth();
	lastPoint = e.middlePoint;
}

function onMouseUp(e) {
	var delta = e.point - lastPoint;
	delta.length = tool.maxDistance;
	addStrokes(e.point, delta);

	//path.add(e.point);
	path.closed = true;
	path.smooth();
}

function addStrokes(point, delta) {
	var step = delta.rotate(90);
	var strokePoints = strokeEnds * 2 + 1;
	point -= step / 2;
	step /= strokePoints - 1;
	for (var i = 0; i < strokePoints; i++) {
		var strokePoint = point + step * i;
		var offset = delta * (Math.random() * 0.3 + 0.1);
		if (i % 2) {
			offset *= -1
		}
		strokePoint += offset;
		path.insert(0, strokePoint);
	}
}
*/

// Sockets
var user_id = Math.random().toString(16).substring(2,15);
console.log(user_id);

var path;
var cursor = new Path.Circle(new Point(0, 0), 10);
cursor.fillColor = '#ddd';

function onMouseMove(e) {
	cursor.visible = true;
	cursor.position = e.point;
}

function onMouseDown(e) {
	cursor.visible = false;

	path = new Path()
	path.strokeColor = '#333';
	path.add(e.point, e.point);
}

function onMouseDrag(e) {
	if (e.modifiers.shift) {
		path.lastSegment.point = e.point;
	} else {
		path.add(e.point);
	}
}