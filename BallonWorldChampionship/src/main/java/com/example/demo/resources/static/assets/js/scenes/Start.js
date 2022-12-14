
// Teclas especiales implementadas en esta escena
var keyEnter;

export class Start extends Phaser.Scene{

    // Constructor
    constructor(){
        super({key:'start'});
    }
    // Gestor de escenas  REFERENCIAS: https://www.youtube.com/watch?v=OBi8UHCcEW8&t=1137s
    preload(){
        this.load.image('logoAstar', 'assets/images/UI/Logo_Astar.png');
        this.load.image('PressToContinue', 'assets/images/UI/Titles/PRESS_ENTER_TO_CONTINUE.png');

    }

    create(){

        // Añadir imágenes
        this.add.image(480, 260, 'logoAstar');
        this.add.image(480, 480, 'PressToContinue');

        //Añadir teclas especiales
        keyEnter=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update(){

        // Evento si la tecla ENTER es pulsada
        if (keyEnter.isDown)
		{
			this.scene.start("mainMenu");
		}
    }
}