var preloadState = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function Preload(){
        Phaser.Scene.call(this, {key: 'Preload'});
    },
    preload: function() {
    // Se cargan las imagenes para este estado
        this.load.image('background', '/client/assets/img/background.jpg');
    },

    create: function() {
        console.log("Preload");
        this.add.sprite(300, 300, 'background');
        game.scene.start('MainMenu');
    },
    update: function() {
        // Se actualizan los objetos y variables
    }
});

// Se añade la escena a la lista de escenas
myGame.scenes.push(preloadState);