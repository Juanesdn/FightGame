var socket; // Define una variable global llamada socket
socket = io.connect(); // Envia una peticion de conexion al server

// Tamaño de la pantalla del navegador
canvas_width = window.innerWidth * window.devicePixelRatio; 
canvas_height = window.innerHeight * window.devicePixelRatio;

//Crea la configuracionn cuando carga la pagina
var config = {
    type: Phaser.AUTO,
    width: canvas_width,
    height: canvas_height,
    scene: myGame.scenes
};

//Instancia el juego con la configuracion
var game = new Phaser.Game(config);

var gameProperties = {
    // Tamaño real del juego para determinar el limite del mundo
    gameWidth: 4000,
    gameHeight: 4000
}