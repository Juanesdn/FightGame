var gamePlayState = new Phaser.Class({
    // Se define la escena
    Extends: Phaser.Scene,
    initialize:
    function GamePlay(){
        Phaser.Scene.call(this, {key: 'GamePlay'});
    },
  
    preload: function() {
        // Carga de imagenes
    },

    create: function() {
        // Creacion de objetos
        console.log("GamePlay");
    },

    update: function() {
        // Actualizacion de objetos y variables
    }
});

// Se añade la escena a la lista de escenas
myGame.scenes.push(gamePlayState);