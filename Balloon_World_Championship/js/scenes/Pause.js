// Teclas especiales implementadas en esta escena
var keyEnter;
var keyP;
var keyO;

export class Pause extends Phaser.Scene{

    constructor(){
        super({key:'pause'});
    }

    preload(){
        this.load.image('Pause', 'assets/Titles/PAUSE.png');
        this.load.image('Continue', 'assets/Buttons/BUTTON_CONTINUE.png');
        this.load.image('BSettings', 'assets/Buttons/BUTTON_SETTINGS.png');
        this.load.image('BMainMenu', 'assets/Buttons/BUTTON_MAIN_MENU.png');
    }

    create(){

        // Añadir imágenes
        this.add.image(640, 100, 'Pause');
        this.add.image(350, 300, 'Continue');
        this.add.image(950, 300, 'BSettings');
        this.add.image(650, 450, 'BMainMenu');

        //Añadir teclas especiales
        keyEnter=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyP=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        keyO=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
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
			this.scene.start("settingsDos");
		}

        // Evento si la tecla O es pulsada
        if (keyO.isDown)
		{
			this.scene.start("mainMenu");
		}
    }
}