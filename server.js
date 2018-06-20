var path = require('path');
var express = require('express'),
    app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 8000;

var x = 50;
var y = 50

app.use('/', express.static(path.join(__dirname + '/')));

http.listen(port, function() {
  console.log('listening');
});

io.on('connection', function(socket){
	socket.on('goRight', function(){
		x++;
	});
	socket.on('goLeft', function(){
		x--;
	});
	socket.on('goUp', function(){
		y--;
	});
	socket.on('goDown', function(){
		y++;
	});
});

setInterval(function(){
	io.emit('update', {x,y});
}, 100);