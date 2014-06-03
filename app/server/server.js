var express = require('express'),
	app     = express(),
	server  = require('http').createServer(app), 
	io      = require('socket.io').listen(server);

io.set('log level', 2); // https://github.com/LearnBoost/Socket.IO/wiki/Configuring-Socket.IO

app.use(express.static(__dirname + '/public/'));


// routing
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/index.htm');
});

 
io.sockets.on('connection', function (socket) {

	socket.on('event', function () {
		

	});
 
});


server.listen(3300);
console.log('Server running http://localhost:3300');

module.exports = app;


