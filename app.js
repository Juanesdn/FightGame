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
            x: 400,
            y: 300,
            life: 100,
            punching: false,
            blocking: false,
            gameOver: false,
            maxSpd: 3
        };
        socket.emit('allplayers',getAllPlayers());
        socket.broadcast.emit('newplayer',socket.player);

        socket.on('move',function(data){
            if (data.direction == 'left'){
                socket.player.x -= socket.player.maxSpd;
            }else if (data.direction == 'right'){
                socket.player.x += socket.player.maxSpd;
            }else if (data.direction == 'punch'){
                socket.player.punching = true;
            }else if (data.direction == 'block'){
                socket.player.blocking = true;
            } else if (data.direction == 'none') {
                socket.player.punching = false;
                socket.player.blocking = false;
            }
            io.emit('move',socket.player);
        });

        socket.on('collided', function(){
            io.emit('collided', socket.player.id);
        })

        socket.on('hit', function(data){
            var players = getAllPlayers();
            var player = players[data.id];
            if (player.life > 0){
                player.life -= 0.2;
            }
            io.emit('hit', player);
        })

        socket.on('gameOver', function(data){
            var players = getAllPlayers();
            var player = players[data.id];
            player.gameOver = true;
            io.emit('gameOver', player);
        })

        socket.on('disconnect',function(){
            server.lastPlayderID--;
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
