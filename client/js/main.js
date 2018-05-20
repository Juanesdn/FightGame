var game = new Phaser.Game(640, 360, Phaser.AUTO);

var mainState = {
    preload: function() {
        // Se cargan las imagenes, audios, etc
        game.load.image('Background', '/client/assets/ppp.gif');
    },
    create: function() {
        // Se crean las cosas
        Sprite = game.add.tileSprite(0, 0, 640, 360, 'Background');
    },
    update: function() {
        // Se ejecuta infinitamente constantemente
    }
};

game.state.add('MainState', MainState);
game.state.start('MainState');