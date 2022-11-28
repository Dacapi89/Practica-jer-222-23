import { Level1} from './scenes/Level1.js';

//Configuracion de la ventana
var config = {
    type: Phaser.AUTO,
    width: 320,
    height: 208,
    antialias: false,
    pixelArt: true,
    roundPixels: false,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false,
            tileBias:16,
        }
    },
    scene: [Level1],
    scale: {
        zoom: 4
    }
};
//Empieza el game con phaser
var game = new Phaser.Game(config);