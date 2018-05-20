var mainMenuState = new Phaser.Class({
    // Se define la escena
    Extends: Phaser.Scene,
    initialize:
    function MainMenu(){
        Phaser.Scene.call(this, {key: 'MainMenu'});
    },
  
    preload: function() {
        // Se cargan las imagenes para este estado
    },

    create: function() {
        console.log("MainMenu");
        game.scene.start('GamePlay');
    },

    update: function() {
        // Se actualizan objetos y variables
    }
});

// Se añade la escena a la lista de escenas
myGame.scenes.push(mainMenuState);
