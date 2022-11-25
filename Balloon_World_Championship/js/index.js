

//Configuracion de la ventana
var config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [Level1]
};
//Variables globales
function move(object,Xspeed,Yspeed){
    object.x+=Xspeed;
    object.y+=Yspeed;
}
function jump(object){

}

//Empieza el game con phaser
var game = new Phaser.Game(config);