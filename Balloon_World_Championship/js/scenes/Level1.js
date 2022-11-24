
function jump(object){

}
this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
});
class Level1 extends Phaser.Scene{
    constructor(){
        super(level1)
    }
    preload()
    {   
        this.load.image("background",'../');        
    }
    create()
    {
        this.scene.add(jugador)
    }
    update()
    {           
        this.input.keyboard.on('keydown_D', move(personaje2,6,0))
        this.input.keyboard.on('keydown_A', move(personaje2,-6,0))
        this.input.keyboard.on('keydown_W', jump(personaje2))
    }
}