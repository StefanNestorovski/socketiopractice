var socket = io();
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

socket.on('update', function(data){
	ctx.clearRect(0, 0, c.width, c.height);
	ctx.beginPath();
	ctx.arc(data, 50, 40, 0, 2 * Math.PI);
	ctx.stroke();
});