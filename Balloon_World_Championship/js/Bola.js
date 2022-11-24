 class Bola {

    constructor(scene, player, plataforms) {
        this.escena = scene;
        this.jugador = player
        this.plataformas = plataforms;
        this.bolas = this.escena.physics.add.group(); //Añadimos físicas al grupo de las bolas
        console.log("Bola creada.");
    }
    getBola() { return this.bola}

    preload() {
        this.escena.load.image('bomb', 'assets/bomb.png');
    }
    create() {
        this.bola = this.bolas.create(200, 300, 'bomb'); //Creamos una bola
        this.bola.body.setGravity(0,-200) //Efecto globo se queda suspendido en el aire REFERENCIA: https://phasergames.com/floating-in-phaser-3/ 
        this.bola.setBounce(0.8);
        this.bola.setCollideWorldBounds(true);
        //this.escena.physics.add.collider(this.bola, this.plataformas);
        //this.escena.physics.add.collider(this.jugador, this.bola, golpearBola(), null, this);
    }
    golpearBola() {
        //bola.setVelocity(10, -100);
        console.log("colision");
    }
}
export {Bola};
