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
var socketAlive = [];

var idNum = 0;
var id = [];

io.on('connection', function(socket){
	var x = 50;
	var y = 50;
	socket.idVal = idNum;
	socketsX.push(x);
	socketsY.push(y);
	socketAlive.push(true);
	id.push(idNum++);
	
	socket.on('goRight', function(){
		socketsX[socket.idVal]++;
	});
	socket.on('goLeft', function(){
		socketsX[socket.idVal]--;
	});
	socket.on('goUp', function(){
		socketsY[socket.idVal]--;
	});
	socket.on('goDown', function(){
		socketsY[socket.idVal]++;
	});
	
	socket.on('disconnect', function(){
		socketAlive[socket.idVal] = false;
	});
	
	setInterval(function(){
		socket.emit('update', {socketsX,socketsY,socketAlive,idNum});
	}, 100);
});
