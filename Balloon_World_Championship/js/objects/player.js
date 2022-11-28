class player{
    constructor(key,fileNamePath,speed,jumpHeight,keyright,keyleft,keyup, score){ 
        this.key=key;                             //Tag del objeto
        this.fileNamePath= fileNamePath;         //Ruta de la imagen
        this.speed = speed;                     //Velocidad de los jugadores
        this.jumpHeight= jumpHeight;           //Potencia de salto de los jugadores
        this.keyup= keyup;                    //Tecla para saltar
        this.keyleft= keyleft;               //Tecla para moverse a la izquierda
        this.keyright= keyright;            //Tecla para moverse a la derecha
        this.playerScore = score;          //Puntuación del jugador
    }
    
    preload(escena,width,height){
        escena.load.spritesheet(this.key,this.fileNamePath,{frameWidth: width, frameHeight: height})
    }
    create(escena, x, y){
        this.player= escena.physics.add.sprite(x,y,this.key);   //Carga la informacion necesarioa para el jugador
        this.player.setCollideWorldBounds(true)
        escena.anims.create({
            key: 'rightRun'+this.key,
            frames: escena.anims.generateFrameNumbers(this.key, { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        
        escena.anims.create({
            key: 'rightIdle'+this.key,
            frames: escena.anims.generateFrameNumbers(this.key, { start: 6, end: 9 }),
            frameRate: 10,
            repeat: -1
        });

        escena.anims.create({
            key: 'leftIdle'+this.key,
            frames: escena.anims.generateFrameNumbers(this.key, { start: 10, end: 13 }),
            frameRate: 10,
            repeat: -1
        });

        escena.anims.create({
            key: 'leftRun'+this.key,
            frames: escena.anims.generateFrameNumbers(this.key, { start: 14, end: 19 }),
            frameRate: 10,
            repeat: -1
        });
    }
    update(escena){
        escena.input.keyboard.on("keydown-"+this.keyright, ()=>{   //Asignacion de teclas
            this.player.setVelocityX(this.speed);
            this.player.anims.play("rightRun"+this.key,true)
        })
        escena.input.keyboard.on("keyup-"+this.keyright, ()=>{
            this.player.setVelocityX(0);
            this.player.anims.play("rightIdle"+this.key,true)
        })
        escena.input.keyboard.on("keydown-"+this.keyleft, ()=>{
            this.player.setVelocityX(-this.speed);
            this.player.anims.play("leftRun"+this.key,true)
        })
        escena.input.keyboard.on("keyup-"+this.keyleft, ()=>{
            this.player.setVelocityX(0);
            this.player.anims.play("leftIdle"+this.key,true)
        })
        escena.input.keyboard.on("keydown-"+this.keyup, ()=>{
            if(this.player.body.blocked.down) {
                this.player.setVelocityY(-this.jumpHeight);
            } 
        })

    }    
}
export {player};  //Exporta la clase player para el level 1