

//Configuracion de la ventana
var config = {
    type: Phaser.AUTO,
    width: 320,
    height: 240,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [MainMenu]
};
//Variables globales


//Empieza el game con phaser
var game = new Phaser.Game(config);