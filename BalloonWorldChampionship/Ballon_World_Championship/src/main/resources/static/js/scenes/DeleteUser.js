// Teclas especiales implementadas en esta escena
var continuar;

export class DeleteUser extends Phaser.Scene{

    constructor(){
        super({key:'delUser'});
    }

    preload(){
        this.load.image('background', 'assets/images/background/Fondo.png');
        this.load.image('Successfull', 'assets/images/UI/Titles/SUCCESSFULLY_DELETED.png');
        this.load.image('UserContinue', 'assets/images/UI/Buttons/BUTTON_CONTINUE.png');
    }

    create(){

        // Añadir imágenes
        this.add.image(480, 312, 'background');
        this.add.image(480, 250, 'Successfull').setScale(1.2);
        continuar = this.add.image(480, 450, 'UserContinue');
        
        continuar.setInteractive();

        continuar.on("pointerdown", ()=>{
			$('#cp').show(0);
			this.scene.start("login");
		})

    }

}