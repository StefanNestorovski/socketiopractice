var socket = io();

var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var map = {}; // You could also use an array
var data = [];

onkeydown = onkeyup = function(e){
	e = e || event; // to deal with IE
	map[e.keyCode] = e.type == 'keydown';
}

setInterval(function(){
	if(map[37]){//left
		socket.emit('goLeft');
	}
	if(map[38]){//right
		socket.emit('jump');
	}
	if(map[39]){//right
		socket.emit('goRight');
	}
},100);

socket.on('update', function(dataServer){
	data = dataServer;
});

setInterval(function(){
	ctx.clearRect(0, 0, c.width, c.height);
	for(var i = 0; i < data.length; i++){
		var diffX = (data[i].x - data[i].prevx)/10;
		var diffY = (data[i].y - data[i].prevy)/10;
		data[i].x += diffX;
		data[i].prevx += diffX;
		data[i].y += diffY;
		data[i].prevy += diffY;
		ctx.fillStyle = 'black';
		ctx.fillRect(data[i].prevx, data[i].prevy, 20, 60);
	}
	ctx.fillStyle = 'green';
	ctx.fillRect(0, 400, canvas.width, canvas.height - 400);
},10);