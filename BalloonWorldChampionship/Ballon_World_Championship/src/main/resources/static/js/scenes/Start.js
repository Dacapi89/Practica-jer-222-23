
// Teclas especiales implementadas en esta escena
var empezar;

export class Start extends Phaser.Scene{
    
    // Constructor
    constructor(){
        super({key:'start'});
    }
    // Gestor de escenas  REFERENCIAS: https://www.youtube.com/watch?v=OBi8UHCcEW8&t=1137s
    preload(){
        this.load.image('logoAstar', 'assets/images/UI/Logo_Astar.png');
        this.load.image('PressToContinue', 'assets/images/UI/Titles/CLICK_TO_CONTINUE.png');

    }

    create(){

        // Añadir imágenes
        this.add.image(480, 260, 'logoAstar');
        empezar = this.add.image(480, 480, 'PressToContinue');
        
		empezar.setInteractive();
        
        empezar.on("pointerdown", ()=>{
			this.scene.start("mainMenu");
		})
    }

}