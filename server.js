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
var socketsVX = [];
var socketsVY = [];
var socketAlive = [];

var idNum = 0;
var id = [];

io.on('connection', function(socket){
	var x = 50;
	var y = 50;
	socket.idVal = idNum;
	socketsX.push(x);
	socketsY.push(y);
	socketsVX.push(0);
	socketsVY.push(0);
	
	socketAlive.push(true);
	id.push(idNum++);
	
	socket.on('goRight', function(){
		socketsX[socket.idVal]++;
	});
	socket.on('goLeft', function(){
		socketsX[socket.idVal]--;
	});
	socket.on('goUp', function(){
		socketsVY[socket.idVal] += -1;
	});
	/*socket.on('goDown', function(){
		socketsY[socket.idVal]++;
	});*/
	
	socket.on('disconnect', function(){
		socketAlive[socket.idVal] = false;
	});
	
	setInterval(function(){
		for(var i = 0; i < idNum; i++){
			socketsY[i] += socketsVY[i];
			socketsVY[i] = socketsY[i] <= (400 - 60) ? ++socketsVY[i] : 0;
			if(socketsY[i] > (400 - 60)){
				socketsY[i] = (400 - 60);
			}
		}
		socket.emit('update', {socketsX,socketsY,socketAlive,idNum});
	}, 100);
});
