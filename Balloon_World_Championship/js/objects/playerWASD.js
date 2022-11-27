class playerWASD extends Phaser.Scene{
    constructor(){
        super(jugador)
    }
    preload(){
        this.load.spritesheet("playerWASD","../assets/images/sprites/player_blank")
    }
    create(){
        this.playerWASD = this.physics.add.sprite(0,0,"playerWASD")
    }
    update(){
        this.input.keyboard.on('keydown_D', move(this.playerWASD,6,0))
        this.input.keyboard.on('keydown_A', move(this.playerWASD,-6,0))
        this.input.keyboard.on('keydown_W', jump(this.playerWASD))
    }

}