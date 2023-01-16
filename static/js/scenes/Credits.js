// Teclas especiales implementadas en esta escena
var keyP;

export class Credits extends Phaser.Scene{

    constructor(){
        super({key:'credits'});
    }

    preload(){
        this.load.image('background', 'assets/images/background/Fondo.png');
        this.load.image('Creadores', 'assets/images/UI/Titles/CREADORES.png');
        this.load.image('Return', 'assets/images/UI/Buttons/BUTTON_RETURN.png');
    }

    create(){

        // Añadir imágenes
        this.add.image(480, 312, 'background');
        this.add.image(475, 300, 'Creadores');
        this.add.image(30, 30, 'Return');

        //Añadir teclas especiales
        keyP=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

    }

    update(){
        if (keyP.isDown)
		{
			this.scene.start("mainMenu");
		}
    }
}