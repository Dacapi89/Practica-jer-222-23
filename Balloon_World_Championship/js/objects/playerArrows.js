class playerArrows extends Phaser.Scene{
    constructor(){
        super(jugador)
    }
    preload(){
        this.load.spritesheet("playerArrows","../assets/images/sprites/player_spain")
    }
    create(){
        this.playerArrows = this.physics.add.sprite(0,0,"playerArrows")
    }
    update(){
        this.input.keyboard.on('keydown_RIGHT', move(this.playerArrows,6,0))
        this.input.keyboard.on('keydown_LEFT', move(this.playerArrows,-6,0))
        this.input.keyboard.on('keydown_UP', jump(this.playerArrows))
    }

}