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

var players = [];
var jumped = false;

io.on('connection', function(socket){
	console.log('Player joined');
	
	socket.player = new player();
	
	players.push(socket.player);
	
	socket.on('goRight', function(){
		socket.player.moveRight();
	});
	socket.on('goLeft', function(){
		socket.player.moveLeft();
	});
	socket.on('jump', function(){
		if(socket.player.y >= (400 - 60))
			socket.player.jump();
	});
	
	socket.on('disconnect', function(){
		players.splice(players.indexOf(socket.player), 1 );
		console.log('Player has left');
	});

});

setInterval(function(){
	for(var i = 0; i < players.length; i++){
		players[i].gravity();
	}
	io.emit('update', players);
	for(var i = 0; i < players.length; i++){
		players[i].setPrev();
	}
}, 100);
	
setInterval(function(){
		console.log(players.length + ' players on');
	}, 5000);

function player(){
	var that = {};
	that.prevx = 50;
	that.prevy = 50;
	that.x = 50;
	that.y = 50;
	that.vx = 0;
	that.vy = 0;
	that.speed = 10;
	that.acc = 2;
	
	that.setPrev = function (){
		that.prevx = that.x;
		that.prevy = that.y;
	}
	
	that.moveRight = function (){
		that.x+=that.speed;
	}
	that.moveLeft = function (){
		that.x-=that.speed;
	}
	that.jump = function (){
		that.vy -= 25;
	}
	that.gravity = function() {
		that.y += that.vy;
		that.vy = that.y <= (400 - 60) ? that.vy+=that.acc : 0;
		if(that.y > (400 - 60)){
			that.y = (400 - 60);
		}
		that.vy = that.y <= (400 - 60) ? that.vy+=that.acc : 0;
		if(that.y > (400 - 60)){
			that.y = (400 - 60);
		}
	}
	
	return that;
}