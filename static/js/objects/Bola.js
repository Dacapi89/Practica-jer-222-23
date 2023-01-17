 class Bola {
    constructor(key,fileNamePath,gravity,firstTurn, turnO){ 
        this.key=key;                       //Tag del objeto  
        this.fileNamePath= fileNamePath;   //Ruta de la imagen
        this.gravity = gravity;           //Gravedad del globo
        this.turn= firstTurn;            //Turno que guarda el propio nombre
        this.turnOponent = turnO;       //Turno que guarda el nombre del contrario

    }
    preload(escena) {
        escena.load.image(this.key, this.fileNamePath);  //recordatorio: convertirlo a sprite para poder cambiar entre powerUps
    }
    create(escena,x, y) {
        this.ball= escena.physics.add.image(x,y,this.key) //Carga todas las propiedades del globo
        this.ball.setGravity(0,this.gravity)
        this.ball.setBounce(0.8,0.5);
        this.ball.setCollideWorldBounds(true);
    }
}
export {Bola}; //Exporta la clase para que pueda ser utilizada en el level 1