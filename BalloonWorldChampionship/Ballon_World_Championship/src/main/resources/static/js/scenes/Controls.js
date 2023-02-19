// Teclas especiales implementadas en esta escena
var back;

export class Controls extends Phaser.Scene{

    constructor(){
        super({key:'control'});
    }

    preload(){
        this.load.image('background', 'assets/images/background/Fondo.png');
        this.load.image('con', 'assets/images/UI/Titles/CONTROLS.png');
        this.load.image('Return', 'assets/images/UI/Buttons/BUTTON_RETURN.png');
        this.load.image('datos', 'assets/images/UI/Titles/CONTROLS_TEXT.png');
    }

    create(){

        // Añadir imágenes
        this.add.image(480, 312, 'background');
        this.add.image(475, 100, 'con').setScale(2);
        back = this.add.image(30, 30, 'Return').setScale(0.5);
        this.add.image(475, 375, 'datos').setScale(0.75);
        
        back.setInteractive();
        
        back.on("pointerdown", ()=>{
			this.scene.start("mainMenu");
		})

    }
}