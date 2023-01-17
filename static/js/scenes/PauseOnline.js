
// Teclas especiales implementadas en esta escena
var keyEnter;
var keyO;

export class PauseOnline extends Phaser.Scene{

    constructor(){
        super({key:'pauseOn'});
    }

    preload(){
        this.load.image('background', 'assets/images/background/Fondo.png');
        this.load.image('Pause', 'assets/images/UI/Titles/PAUSE.png');
        this.load.image('Continue', 'assets/images/UI/Buttons/BUTTON_CONTINUE.png');
        this.load.image('BMainMenu', 'assets/images/UI/Buttons/BUTTON_MAIN_MENU.png');
        }

    create(){

        // Añadir imágenes
        this.add.image(480, 312, 'background');
        this.add.image(480, 100, 'Pause');
        this.add.image(250, 350, 'Continue');
        this.add.image(700, 350, 'BMainMenu');

        //Añadir teclas especiales
        keyEnter=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyO=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
    
    }

    update(){

        // Evento si la tecla O es pulsada
        if (keyEnter.isDown)
		{
            this.scene.stop("pauseOn");
			this.scene.resume("LevelOn");
		}

        // Evento si la tecla O es pulsada
        if (keyO.isDown)
		{
            this.scene.stop("pauseOn");
            this.scene.stop("LevelOn");
			this.scene.start("mainMenu");

		}
    }
}