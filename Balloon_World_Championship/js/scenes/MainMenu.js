
// Teclas especiales implementadas en esta escena
var keyEnter;

export class MainMenu extends Phaser.Scene{

    constructor(){
        super({key:'mainMenu'});
    }

    preload(){
        this.load.image('background', 'assets/images/background/Fondo.png');
        this.load.image('logoJuego', 'assets/images/UI/Logo_BWC.png');
        this.load.image('BotonPlay', 'assets/images/UI/Buttons/BUTTON_PLAY.png');
    }

    create(){

        // Añadir imágenes
        this.add.image(640, 416, 'background');
        this.add.image(900, 400, 'logoJuego');
        this.add.image(350, 416, 'BotonPlay');

        //Añadir teclas especiales
        keyEnter=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update(){

        // Evento si la tecla ENTER es pulsada
        if (keyEnter.isDown)
		{
			this.scene.start("Level1");
		}
    }
}