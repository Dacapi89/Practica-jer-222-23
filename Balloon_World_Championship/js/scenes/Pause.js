
// Teclas especiales implementadas en esta escena
var keyEnter;
var keyO;

export class Pause extends Phaser.Scene{

    constructor(){
        super({key:'pause'});
    }

    preload(){
        this.load.image('background', 'assets/images/background/Fondo.png');
        this.load.image('Pause', 'assets/images/UI/Titles/PAUSE.png');
        this.load.image('Continue', 'assets/images/UI/Buttons/BUTTON_CONTINUE.png');
        this.load.image('BMainMenu', 'assets/images/UI/Buttons/BUTTON_MAIN_MENU.png');
        }

    create(){

        // Añadir imágenes
        this.add.image(640, 416, 'background');
        this.add.image(640, 100, 'Pause');
        this.add.image(350, 450, 'Continue');
        this.add.image(850, 450, 'BMainMenu');

        //Añadir teclas especiales
        keyEnter=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyO=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
    
    }

    update(){

        // Evento si la tecla O es pulsada
        if (keyEnter.isDown)
		{
            this.scene.stop("pause");
			this.scene.resume("Level1");
		}

        // Evento si la tecla O es pulsada
        if (keyO.isDown)
		{
            this.scene.stop("pause");
            this.scene.stop("Level1");
			this.scene.start("mainMenu");
		}
    }
}