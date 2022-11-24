function move(object,Xspeed,Yspeed){
    object.x+=Xspeed;
    object.y+=Yspeed;
}
function jump(object){

}
class playerWASD extends Phaser.Scene{
    constructor(){
        super(jugador)
    }
    preload(){
        this.load.spritesheet("player","../../media/visual/sprites/player_spain.png")
    }
    create(){
        this.player = this.physics.add.sprite(0,0,"player")
    }
    update(){
        this.input.keyboard.on('keydown_D', move(personaje1,6,0))
        this.input.keyboard.on('keydown_A', move(personaje1,-6,0))
        this.input.keyboard.on('keydown_W', jump(personaje1))
    }

}