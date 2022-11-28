
// Teclas especiales implementadas en esta escena
var keyEnter;
var keyP;

export class Results extends Phaser.Scene{

    constructor(){
        super({key:'results'});
    }

    preload(){
        this.load.image('podio', 'assets/Podio_V.1.png');
        this.load.image('Victory', 'assets/Titles/VICTORY.png');
        this.load.image('Continue', 'assets/Buttons/BUTTON_CONTINUE.png');
        this.load.image('Exit', 'assets/Buttons/BUTTON_EXIT.png');
    }

    create(){
        this.add.image(600, 725, 'podio');
        this.add.image(410, 100, 'Victory');
        this.add.image(350, 300, 'Continue');
        this.add.image(950, 300, 'Exit');

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
            this.scene.start("mainMenu");
        }
        }
}