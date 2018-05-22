var Client = {};
Client.socket = io.connect();

Client.askNewPlayer = function(){
    Client.socket.emit('newplayer');
};

Client.sendMove = function(direction){
    Client.socket.emit('move',{direction:direction});
};

Client.sendCollision = function(){
    Client.socket.emit('collided');
}

Client.socket.on('newplayer',function(data){
    Game.addNewPlayer(data.id,data.x,data.y);
});

Client.socket.on('remove',function(id){
    Game.removePlayer(id);
});

Client.socket.on('move',function(data){
    Game.movePlayer(data.id,data.x,data.y, data.punching, data.blocking);
});

Client.socket.on('collided', function(data){
    Game.HandleCollision(data);
})

Client.socket.on('allplayers',function(data){
    if (data.length <= 2){
        for(var i = 0; i < data.length; i++){
            Game.addNewPlayer(data[i].id,data[i].x,data[i].y);
        }
    }
});
