
// Teclas especiales implementadas en esta escena
var continuar;
var menuPrincipal;

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
        this.add.image(480, 312, 'background');
        this.add.image(480, 100, 'Pause').setScale(2);
        continuar = this.add.image(250, 350, 'Continue');
        menuPrincipal = this.add.image(700, 350, 'BMainMenu');

        continuar.setInteractive();
        menuPrincipal.setInteractive();
        
        continuar.on("pointerdown", ()=>{
			this.scene.stop("pause");
			this.scene.resume("Level1");
		})
		
		menuPrincipal.on("pointerdown", ()=>{
			 this.scene.stop("pause");
            this.scene.stop("Level1");
			this.scene.start("mainMenu");
		})
    
    }

    /*update(){

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
    }*/
}