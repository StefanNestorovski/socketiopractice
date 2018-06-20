var path = require('path');
var express = require('express'),
    app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 8000;

app.use('/', express.static(path.join(__dirname + '/')));

http.listen(port, function() {
  console.log('listening');
});

var socketsX = [];
var socketsY = [];

var idNum = 0;
var id = [];

io.on('connection', function(socket){
	var x = 50;
	var y = 50;
	idVal = idNum;
	socketsX.push(x);
	socketsY.push(y);
	id.push(idNum++);
	
	socket.on('goRight', function(){
		socketsX[idVal]++;
	});
	socket.on('goLeft', function(){
		socketsX[idVal]--;
	});
	socket.on('goUp', function(){
		socketsY[idVal]--;
	});
	socket.on('goDown', function(){
		socketsY[idVal]++;
	});
	
	setInterval(function(){
		socket.emit('update', {socketsX,socketsY, idNum});
	}, 100);
});
