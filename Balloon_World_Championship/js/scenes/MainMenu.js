
// Teclas especiales implementadas en esta escena
var keyO;
var keyEnter;

export class MainMenu extends Phaser.Scene{

    constructor(){
        super({key:'mainMenu'});
    }

    preload(){
        this.load.image('background', 'assets/images/background/Fondo.png');
        this.load.image('logoJuego', 'assets/images/UI/Logo_BWC.png');
        this.load.image('BotonPlay', 'assets/images/UI/Buttons/BUTTON_PLAY.png');
        this.load.image('credits', 'assets/images/UI/Titles/CREDITS.png');

        this.load.audio('menu_theme', [ //Añadimos música al juego REFERENCIA: https://phaser.io/examples/v2/audio/play-music
            'assets/music/title/title_music.ogg',  // Música utilizada para la partida: https://www.youtube.com/watch?v=QG6STlj-d7w
            'assets/music/title/title_music.mp3'
        ]);
    }

    create(){

        // Añadir imágenes
        this.add.image(640, 416, 'background');
        this.add.image(900, 400, 'logoJuego');
        this.add.image(350, 416, 'BotonPlay');
        this.add.image(380, 550, 'credits');

        //Añadir teclas especiales
        keyO=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
        keyEnter=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.music = this.sound.add('menu_theme');
        this.sound.stopAll();
        this.music.play();
        this.music.loop = true;
    }

    update(){

        // Evento si la tecla ENTER es pulsada
        if (keyEnter.isDown)
		{
			this.scene.start("Level1");
            this.music.stop();
		}
        else if (keyO.isDown){
            this.scene.start("credits");

        }
    }
}