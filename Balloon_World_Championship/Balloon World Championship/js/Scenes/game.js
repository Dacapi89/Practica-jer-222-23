var keyEnter;
var keyP;

export class Game extends Phaser.Scene{

    constructor(){
        super({key:'game'});
    }

    preload(){
        this.load.image('Aclaracion', 'assets/Titles/ACLARACIÓN.png');
    }

    create(){
        this.add.image(640, 400, 'Aclaracion');

        //Añadir teclas especiales
        keyEnter=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyP=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    }

    update(){
        // Evento si la tecla ENTER es pulsada
        if (keyEnter.isDown)
		{
			this.scene.start("results");
		}

        if (keyP.isDown)
		{
			this.scene.start("pause");
		}
    }
}