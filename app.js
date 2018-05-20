var express = require('express');
var app = express();
var server = require('http').Server(app);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

app.use('/client', express.static(__dirname + '/client'));

server.listen('2000');
console.log('Server Started')

var SOCKET_LIST = {};

var io = require('socket.io')(server, {});
io.sockets.on('connection', function(sockets){
    socket.id = Math.random();
    socket.x = 0;
    socket.y = 0;
    SOCKET_LIST[socket.id] = socket;

    console.log('Socket Connection');
});

setInterval(function(){
    for(var i in SOCKET_LIST){
        var socket = SOCKET_LIST[i];
        socket.x++;
        socket.y++;
        socket.emit('newPosition', {
            x: socket.x,
            y: socket.y,
        });
    }

}, 1000/25);