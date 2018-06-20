var path = require('path');
var express = require('express'),
    app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var x = 0;

app.use('/', express.static(path.join(__dirname + '/')));

http.listen(3000, function() {
  console.log('listening');
});

setInterval(function(){
	x++;
	io.emit('update', x);
}, 1000);