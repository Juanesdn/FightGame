var preloadState = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function Preload(){
        Phaser.Scene.call(this, {key: 'Preload'});
    },
    preload: function() {
    // Se cargan las imagenes para este estado
    },

    create: function() {
        console.log("Preload");
        game.scene.start('MainMenu');
    },
    update: function() {
        // Se actualizan los objetos y variables
    }
});

// Se añade la escena a la lista de escenas
myGame.scenes.push(preloadState);