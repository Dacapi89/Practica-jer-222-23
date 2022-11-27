 class Bola {

    constructor(scene) {
        this.escena = scene;
        this.bolas = this.escena.physics.add.group(); //Añadimos físicas al grupo de las bolas
        console.log("Bola creada.");
    }
    getBola() { return this.bola}

    preload() {
        this.escena.load.image('bola', '../assets/images/sprites/ball2.png');
    }
    create() {
        this.bola = this.bolas.create(100, 100, 'bola'); //Creamos una bola
        this.bola.body.setGravity(0,-200)
        this.bola.setBounce(0.8,0.5);
        this.bola.setCollideWorldBounds(true);
    }

    reinicio() {

    }
}
export {Bola};