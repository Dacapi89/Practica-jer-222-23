

//Configuracion de la ventana
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
//Variables globales


//Empieza el game con phaser
var game = new Phaser.Game(config);

function preload()
{

}
function create()
{

}
function update()
{

}