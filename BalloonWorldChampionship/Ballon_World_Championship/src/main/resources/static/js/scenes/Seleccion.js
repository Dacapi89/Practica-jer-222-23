
// Teclas especiales implementadas en esta escena
var keyO;
var keyEnter;
var keyP;

export class Seleccion extends Phaser.Scene{

    constructor(){
        super({key:'selec'});
    }

    preload(){
        this.load.image('background', 'assets/images/background/Fondo.png');
        this.load.image('BotonLocal', 'assets/images/UI/Buttons/BUTTON_LOCAL.png');
        this.load.image('BotonOnline', 'assets/images/UI/Buttons/BUTTON_ONLINE.png');
        this.load.image('Return', 'assets/images/UI/Buttons/BUTTON_RETURN.png');

        this.load.audio('menu_theme', [ //Añadimos música al juego REFERENCIA: https://phaser.io/examples/v2/audio/play-music
            'assets/music/title/title_music.ogg',  // Música utilizada para la partida: https://www.youtube.com/watch?v=QG6STlj-d7w
            'assets/music/title/title_music.mp3'
        ]);
    }

    create(){

        // Añadir imágenes
        this.add.image(480, 312, 'background');
        this.add.image(700, 280, 'BotonLocal');
        this.add.image(250, 280, 'BotonOnline');
        this.add.image(30, 30, 'Return');

        //Añadir teclas especiales
        keyO=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
        keyEnter=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyP=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        this.music = this.sound.add('menu_theme');
        this.sound.stopAll();
        this.music.play();
        this.music.loop = true;
    }

    update(){

        // Evento si la tecla ENTER es pulsada
        if (keyEnter.isDown)
		{
			this.scene.start("LevelOn");
            this.music.stop();
		}
        else if (keyO.isDown){
            this.scene.start("Level1");

        }
        else if (keyP.isDown){
            this.scene.start("mainMenu");

        }
    }
}