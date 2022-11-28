
// Teclas especiales implementadas en esta escena
var keyEnter;
//var keyP;

export class MainMenu extends Phaser.Scene{

    constructor(){
        super({key:'mainMenu'});
    }

    preload(){
        this.load.image('background', 'assets/images/background/Fondo.png');
        this.load.image('logoJuego', 'assets/images/UI/Logo_BWC.png');
        this.load.image('BotonPlay', 'assets/images/UI/Buttons/BUTTON_PLAY.png');
        //this.load.image('BotonSettings', 'assets/images/UI/Buttons/BUTTON_SETTINGS.png');
    }

    create(){

        // Añadir imágenes
        this.add.image(640, 416, 'background');
        this.add.image(900, 400, 'logoJuego');
        this.add.image(350, 416, 'BotonPlay');
        //this.add.image(350, 550, 'BotonSettings');

        //Añadir teclas especiales
        keyEnter=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        //keyP=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    }

    update(){

        // Evento si la tecla ENTER es pulsada
        if (keyEnter.isDown)
		{
			this.scene.start("Level1");
		}

        // Evento si la tecla P es pulsada
        /*if (keyP.isDown)
		{
			this.scene.start("settings");
		}*/
    }
}