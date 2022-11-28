 class Bola {
    constructor(key,fileNamePath,gravity,firstTurn){ 
        this.key=key;  
        this.fileNamePath= fileNamePath;
        this.gravity = gravity;
        this.turn= firstTurn;

    }
    preload(escena) {
        escena.load.image(this.key, this.fileNamePath);//recordatorio: convertirlo a sprite para poder cambiar entre powerUps
    }
    create(escena,x, y) {
        this.ball= escena.physics.add.image(x,y,this.key)
        this.ball.setGravity(0,this.gravity)
        this.ball.setBounce(0.8,0.5);
        this.ball.setCollideWorldBounds(true);
    }
}
export {Bola};