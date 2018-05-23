var Game = {};

Game.init = function(){
    game.stage.disableVisibilityChange = true;
};

Game.preload = function() {
    game.load.image('fondo', '/client/assets/img/2.jpg');    
    game.load.spritesheet('robot_red','/client/assets/sprites/robot_red.png', 80, 111,35);
    game.load.spritesheet('robot_blue','/client/assets/sprites/robot_blueS.png', 80, 111,35);
};

Game.create = function(){
    Game.playerMap = {};
    Game.playerPunch = {};
    Game.playerBlock = {};

    game.add.tileSprite(0, 0, 800, 600, 'fondo');
    game.physics.startSystem(Phaser.Physics.ARCADE);
    Client.askNewPlayer();
};

Game.update = function(){
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
        Client.sendMove('left');
        
    }else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
        Client.sendMove('right');
    }else if (game.input.keyboard.isDown(Phaser.Keyboard.Q) ||
              game.input.keyboard.isDown(Phaser.Keyboard.W)) {
        Client.sendMove('punch');
    }else if (game.input.keyboard.isDown(Phaser.Keyboard.E) ||
              game.input.keyboard.isDown(Phaser.Keyboard.R)) {
        Client.sendMove('block');
    } else{
        Client.sendMove('none');
    }

    if(Object.keys(Game.playerMap).length == 2){
        game.physics.arcade.collide(Game.playerMap[0], Game.playerMap[1])
    }
    
};

Game.render = function(){
    if(Object.keys(Game.playerMap).length == 2){
        game.debug.body(Game.playerMap[0]);
        game.debug.body(Game.playerMap[1]);
    }
}

Game.HandleCollision = function(){
    if(Game.playerPunch[0] && !Game.playerBlock[1]){
        console.log("hit");
    }

    if(Game.playerPunch[1] && !Game.playerBlock[0]){
        console.log("hit");
    }
};

Game.movePlayer = function(id, x, y, punch, block){
    var player = Game.playerMap[id];
    Game.playerPunch[id] = punch;
    Game.playerBlock[id] = block;
    var distance = Phaser.Math.distance(player.x,x);
    var tween = game.add.tween(player);
    tween.to({x:x,y:y}, 0.1);
    tween.start();

    
    //Animations of the robot
    if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
        player.animations.play('walk');
        player.scale.x=1;
    }else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
        player.animations.play('walk');
        player.scale.x=-1;
    }else if (game.input.keyboard.isDown(Phaser.Keyboard.Q)){
        player.animations.play('punch');
        player.scale.x=-1;
    }else if (game.input.keyboard.isDown(Phaser.Keyboard.W)){
        player.animations.play('punch');
        player.scale.x=1;
    }else if (game.input.keyboard.isDown(Phaser.Keyboard.E)){
        player.animations.play('block');
        player.scale.x=-1;
    }else if (game.input.keyboard.isDown(Phaser.Keyboard.R)){
        player.animations.play('block');
        player.scale.x=1;
    }else {
        player.animations.play('idle');
    }
};

Game.addNewPlayer = function(id,x,y){
    if (id == 0){
        Game.playerPunch[id] = false;
        Game.playerBlock[id] = false;
        Game.playerMap[id] = game.add.sprite(x,y,'robot_red');
        Game.playerMap[id].animations.add('walk', [10,11,12,13,14,15,16,17], 12,true, "robot_red");
        Game.playerMap[id].animations.add('idle', [0,1,2,3,4,5,6,7,8,9], 12,true, "robot_red");
        Game.playerMap[id].animations.add('punch', [10,19], 12,false, "robot_red");
        Game.playerMap[id].animations.add('block', [24,25,25], 12,false, "robot_red");
        game.physics.enable(Game.playerMap[id], Phaser.Physics.ARCADE);
        Game.playerMap[id].body.collideWorldBounds = true;
        Game.playerMap[id].body.onCollide = new Phaser.Signal();
        Game.playerMap[id].body.onCollide.add(Game.HandleCollision, this);
    } else {
        Game.playerPunch[id] = false;
        Game.playerBlock[id] = false;
        Game.playerMap[id] = game.add.sprite(x,y,'robot_blue');
        Game.playerMap[id].animations.add('walk', [10,11,12,13,14,15,16,17], 12,true, "robot_blueS");
        Game.playerMap[id].animations.add('idle', [0,1,2,3,4,5,6,7,8,9], 12,true, "robot_blueS");
        Game.playerMap[id].animations.add('punch', [10,19], 12,false, "robot_blueS");
        Game.playerMap[id].animations.add('block', [24,25,25], 12,false, "robot_blueS");
        game.physics.enable(Game.playerMap[id], Phaser.Physics.ARCADE);
        Game.playerMap[id].body.collideWorldBounds = true;
        Game.playerMap[id].body.onCollide = new Phaser.Signal();
        Game.playerMap[id].body.onCollide.add(Game.HandleCollision, this);
    }

    
};

Game.removePlayer = function(id){
    Game.playerMap[id].destroy();
    delete Game.playerMap[id];
};