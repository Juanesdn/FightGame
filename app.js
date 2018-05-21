var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);


app.get('/',function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
});

app.use('/client',express.static(__dirname + '/client'));


server.listen(2000,function(){ // Listens to port 2000
    console.log('Listening on '+server.address().port);
});

server.lastPlayderID = 0; // Keep track of the last id assigned to a new player


io.on('connection',function(socket){

    socket.on('newplayer',function(){
        socket.player = {
            id: server.lastPlayderID++,
            x: randomInt(100,400),
            y: randomInt(100,400),
            maxSpd: 3,
        };
        socket.emit('allplayers',getAllPlayers());
        socket.broadcast.emit('newplayer',socket.player);

        socket.on('move',function(data){
            if (data.direction == 'left'){
                socket.player.x -= socket.player.maxSpd;
            }else if (data.direction == 'right'){
                socket.player.x += socket.player.maxSpd;
            }
            io.emit('move',socket.player);
        });


        socket.on('disconnect',function(){
            io.emit('remove',socket.player.id);
        });
    });
});

function getAllPlayers(){
    var players = [];
    Object.keys(io.sockets.connected).forEach(function(socketID){
        var player = io.sockets.connected[socketID].player;
        if(player) players.push(player);
    });
    return players;
}

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}
