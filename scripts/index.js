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
	ctx.beginPath();
	ctx.arc(data.x, data.y, 40, 0, 2 * Math.PI);
	ctx.stroke();
});