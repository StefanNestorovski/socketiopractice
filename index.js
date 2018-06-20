var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var x = 0;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

setInterval(function(){
	x++;
	io.emit('update', x);
}, 10);

http.listen(3000, function(){
  console.log('listening on *:3000');
});