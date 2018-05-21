var Game = {};

Game.init = function(){
    game.stage.disableVisibilityChange = true;
};

Game.preload = function() {
    game.load.image('fondo', '/client/assets/img/background.png');    
    game.load.spritesheet('sprite','/client/assets/sprites/robot.png', 80, 111); // this will be the sprite of the players
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
    } else{
        Client.sendMove('none');
    }
};

Game.movePlayer = function(id, x, y){
    var player = Game.playerMap[id];
    var distance = Phaser.Math.distance(player.x,x);
    var tween = game.add.tween(player);
    tween.to({x:x,y:y}, 0.1);
    tween.start();
    if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
        player.animations.play('walk');
        player.scale.x=1;
    }else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
        player.animations.play('walk');
        player.scale.x=-1;
    } else {
        player.animations.play('idle');
    }
};

Game.addNewPlayer = function(id,x,y){
    Game.playerMap[id] = game.add.sprite(x,y,'sprite');
    Game.playerMap[id].animations.add('walk', [10,11,12,13,14,15,16,17], 12,true, "sprite");
    Game.playerMap[id].animations.add('idle', [0,1,2,3,4,5,6,7,8,9], 12,true, "sprite");
    Game.playerMap[id].animations.add('jump', [18,19,20,21,22,23,24,25], 12,false, "sprite");
};

Game.removePlayer = function(id){
    Game.playerMap[id].destroy();
    delete Game.playerMap[id];
};