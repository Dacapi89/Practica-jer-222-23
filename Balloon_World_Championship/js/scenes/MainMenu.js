
// Teclas especiales implementadas en esta escena
var keyEnter;
var keyP;

export class MainMenu extends Phaser.Scene{

    constructor(){
        super({key:'mainMenu'});
    }

    preload(){
        this.load.image('logoJuego', 'assets/Logo_V.1.png');
        this.load.image('BotonPlay', 'assets/Buttons/BUTTON_PLAY.png');
        this.load.image('BotonSettings', 'assets/Buttons/BUTTON_SETTINGS.png');
    }

    create(){

        // Añadir imágenes
        this.add.image(900, 400, 'logoJuego');
        this.add.image(350, 250, 'BotonPlay');
        this.add.image(350, 550, 'BotonSettings');

        //Añadir teclas especiales
        keyEnter=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyP=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    }

    update(){

        // Evento si la tecla ENTER es pulsada
        if (keyEnter.isDown)
		{
			this.scene.start("game");
		}

        // Evento si la tecla P es pulsada
        if (keyP.isDown)
		{
			this.scene.start("settings");
		}
    }
}