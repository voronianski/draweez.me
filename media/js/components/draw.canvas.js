$(function() {
	var canvas = $('#draweez');
	var context = canvas[0].getContext('2d');

	context.beginPath();
	context.moveTo(100, 20);
	context.lineTo(450, 50);
	context.stroke();

});