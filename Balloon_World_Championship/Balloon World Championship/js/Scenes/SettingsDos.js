// Teclas especiales implementadas en esta escena
var keyP;
var keyO;

export class SettingsDos extends Phaser.Scene{

    constructor(){
        super({key:'settingsDos'});
    }

    preload(){
        this.load.image('Settings', 'assets/Titles/SETTINGS.png');
        this.load.image('Music', 'assets/Titles/MUSIC.png');
        this.load.image('Controls', 'assets/Titles/CONTROLS.png');
        this.load.image('Credits', 'assets/Titles/CREDITS.png');
        this.load.image('Return', 'assets/Buttons/BUTTON_RETURN.png');
    }

    create(){

        // Añadir imágenes
        this.add.image(640, 100, 'Settings');
        this.add.image(410, 300, 'Music');
        this.add.image(410, 500, 'Controls');
        this.add.image(410, 700, 'Credits');
        this.add.image(30, 30, 'Return');

        //Añadir teclas especiales
        keyP=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        keyO=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);

    }

    update(){
        if (keyP.isDown)
		{
			this.scene.start("pause");
		}

        if (keyO.isDown)
		{
			this.scene.start("creditsDos");
		}
    }
}