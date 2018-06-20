var socket = io();

var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var map = {}; // You could also use an array
onkeydown = onkeyup = function(e){
	e = e || event; // to deal with IE
	map[e.keyCode] = e.type == 'keydown';
}

setInterval(function(){
	if(map[37]){//left
		socket.emit('goLeft');
	}
	if(map[39]){//right
		socket.emit('goRight');
	}
	if(map[38]){//up
		socket.emit('goUp');
	}
	if(map[40]){//down
		socket.emit('goDown');
	}
},10);

socket.on('update', function(data){
	ctx.clearRect(0, 0, c.width, c.height);
	
	for(var i = 0; i < data.idNum; i++){
		if(data.socketAlive[i]){
			ctx.fillStyle = 'black';
			ctx.fillRect(data.socketsX[i], data.socketsY[i], 20, 60);
		}
	}
	ctx.fillStyle = 'green';
	ctx.fillRect(0, 400, canvas.width, canvas.height - 400);
});