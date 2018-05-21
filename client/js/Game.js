var Game = {};

Game.init = function(){
    game.stage.disableVisibilityChange = true;
};

Game.preload = function() {
    game.load.image('fondo', '/client/assets/img/background.png');    
    game.load.image('sprite','/client/assets/sprites/sprite.png'); // this will be the sprite of the players
};

Game.create = function(){
    Game.playerMap = {};
    game.add.tileSprite(0, 0, 800, 600, 'fondo');
    Client.askNewPlayer();
};

Game.update = function(){
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
        Client.sendMove('left');
    }else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
        Client.sendMove('right');
    }else if (game.input.keyboard.isDown(Phaser.Keyboard.UP)){
        Client.sendMove('up');
    }else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
        Client.sendMove('down');
    }
}


Game.movePlayer = function(id, x, y){
    var player = Game.playerMap[id];
    var distance = Phaser.Math.distance(player.x,x);
    var tween = game.add.tween(player);
    tween.to({x:x,y:y}, 0.1);
    tween.start();
}


Game.addNewPlayer = function(id,x,y){
    Game.playerMap[id] = game.add.sprite(x,y,'sprite');
};

Game.removePlayer = function(id){
    Game.playerMap[id].destroy();
    delete Game.playerMap[id];
};


