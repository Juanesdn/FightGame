var socket; // Define una variable global llamada socket
socket = io.connect(); // Envia una peticion de conexion al server

var fight_button;
var robot_t1;
var robot_t2;

// Tamaño de la pantalla del navegador
canvas_width = 1000,
canvas_height = 800

//Crea la configuracionn cuando carga la pagina
var config = {
    type: Phaser.CANVAS,
    width: canvas_width,
    height: canvas_height,
    parent: 'gameDiv',
};

//Instancia el juego con la configuracion
var game = new Phaser.Game(config);


var gameProperties = {
    // Tamaño real del juego para determinar el limite del mundo
    gameWidth: 4000,
    gameHeight: 4000
}

// Main state
var main = function(game){
};

main.prototype = {
    preload: function() {
        // Esta funcion se llama cuando se carga el juego
        game.load.image('fondo', '/client/assets/img/background.png');
        game.load.image('t1_static', '/client/assets/RobotSprite/t1_static.png');
        game.load.image('t2_static', '/client/assets/DragonSprite/t2_static.png');
        game.load.image('fight_btn', '/client/assets/img/fight.png');
        //ANIMACIÓN PENDIENTE game.load.spritesheet('robot','/client/assets/RobotSprite/t1_walk_right.png', 70, 80, 5);

    },

    create: function() {
        console.log('client started');
        // Espera a recibir el mensaje "connect" del servidor
        // El server emite un mensaje "connect" cuando el cliente se conecta
        // Cuando el cliente se conecta se llama la funcion onSocketConnected.
        socket.on("connect", onSocketConnected);
        game.add.tileSprite(0, 0, canvas_width,canvas_height,'fondo');
       robot_t1 = game.add.sprite(canvas_width-600,canvas_height-120,'t1_static');
       robot_t2 = game.add.sprite(canvas_width-380,canvas_height-120,'t2_static');
        //BOTON PRUEBA fight_button = game.add.sprite(canvas_width/2,canvas_height/2, 'fight_btn');
        //BOTON PRUEBA fight_button.anchor.setTo(0.5,0.5);
        robot_t1.anchor.setTo(0.5,0.5);
        robot_t2.anchor.setTo(0.5,0.5);
        robot_t1.scale.setTo(1,1);
        robot_t2.scale.setTo(1,1);
        
        //PENDIENTE var robot = game.add.sprite(300,200,'robot');
        //PENDIENTE var walk = robot.animations.add('walk');
        //PENDIENTE robot.animations.play('walk',30, true);
        
    },
update: function(){
//Animar juego

}
}

// Esta funcion es llamada cuando se conecta al servidor
function onSocketConnected() {
    console.log('connected to server');
}

// Envuelve los estados de juego
var gameBootStrapper = {
    init: function(gameContainerElementId, game){
        game.state.add('main', main);
        game.state.start('main');
    }
};;

gameBootStrapper.init("gameDiv", game);
