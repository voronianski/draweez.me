var express = require('express');
var http = require('http');
var config = require('./config');
var routes = require('./routes/router');
var app = express();

// http server for socket.io + express 3.x
var server = http.createServer(app);
var io = require('socket.io').listen(server);

// app configuration
config.environment(express, app);

app.get('/', routes.index);
app.get('/draw', routes.draw);

// sockets
//io.set('log level', 1);
io.sockets.on('connection', function(socket) {
	socket.on('move', function(data) {
		//console.log(data.x);
		socket.broadcast.emit('moving', data);
	});
});

server.listen(config.port);
console.log('App starts on localhost:' + config.port);