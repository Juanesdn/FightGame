var game = new Phaser.Game(640, 360, Phaser.AUTO);

var mainState = {
    preload: function() {
        // Se cargan las imagenes, audios, etc
    },
    create: function() {
        // Se crean las cosas
    },
    update: function() {
        // Se ejecuta infinitamente constantemente
    }
};

game.state.add('MainState', MainState);
game.state.start('MainState');