class player{
    constructor(key,fileNamePath,speed,jumpHeight,keyleft,keyright,keyup){ 
        this.key=key;  
        this.fileNamePath= fileNamePath;
        this.speed = speed;
        this.jumpHeight= jumpHeight;
        this.keyup= 'keydown_'+keyup;
        this.keyleft= 'keydown_'+keyleft;
        this.keyright= 'keydown_'+keyright;
    }
    preload(escena){
        escena.load.spritesheet(key,fileNamePath)
    }
    create(escena, x, y){
        this.p= escena.physics.add.sprite(x,y,key).setCollideWorldBounds(true);
    }
    update(escena){
        escena.input.keyboard.on(keyleft, move(this.p,speed))
        escena.input.keyboard.on(keyright, move(this.p,-speed))
        escena.input.keyboard.on(keyup, jump(this.p))
    }
    move(object,Xspeed){
        object.setVelocityX(Xspeed);
    }
    jump(object){
        if (escena.player.body.touching.down){
            object.setVelocityY(-this.jumpHeight);
        }       
    }
}