var express = require('express'),
	app     = express(),
	server  = require('http').createServer(app);

app.use(express.static(__dirname + '/public/'));

// routing
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/index.htm');
});

server.listen(3300);
console.log('Server running http://localhost:3300');

module.exports = app;
