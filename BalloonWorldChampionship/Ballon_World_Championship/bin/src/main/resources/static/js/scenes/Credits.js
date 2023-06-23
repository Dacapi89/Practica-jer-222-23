// Teclas especiales implementadas en esta escena
var back;

export class Credits extends Phaser.Scene{

    constructor(){
        super({key:'credits'});
    }

    preload(){
        this.load.image('background', 'assets/images/background/Fondo.png');
        this.load.image('Creadores', 'assets/images/UI/Titles/CREDITS_TEXT.png');
        this.load.image('Return', 'assets/images/UI/Buttons/BUTTON_RETURN.png');
    }

    create(){

        // Añadir imágenes
        this.add.image(480, 312, 'background');
        this.add.image(475, 300, 'Creadores').setScale(0.6);
        back = this.add.image(30, 30, 'Return').setScale(0.5);
        
        back.setInteractive();

        back.on("pointerdown", ()=>{
			this.scene.start("mainMenu");
		})

    }

}