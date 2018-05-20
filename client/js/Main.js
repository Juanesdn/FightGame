var socket; // Define una variable global llamada socket
socket = io.connect(); // Envia una peticion de conexion al server

// Tamaño de la pantalla del navegador
canvas_width = 1000,
canvas_height = 800

//Crea la configuracionn cuando carga la pagina
var config = {
    type: Phaser.AUTO,
    width: canvas_width,
    height: canvas_height,
    scene: myGame.scenes,
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
    },
    create: function() {
        console.log('client started');
        // Espera a recibir el mensaje "connect" del servidor
        // El server emite un mensaje "connect" cuando el cliente se conecta
        // Cuando el cliente se conecta se llama la funcion onSocketConnected.
        socket.on("connect", onSocketConnected);
    }
}

// Esta funcion es llamada cuando se conecta al servidor
function onSocketConnected() {
    console.log('connected to server');
}

// Envuelve los estados de juego
var gameBootStrapper = {
    init: function(gameContainerElementId){
        game.state.add('main', main);
        game.state.start('main');
    }
};;

gameBootStrapper.init("gameDiv");
