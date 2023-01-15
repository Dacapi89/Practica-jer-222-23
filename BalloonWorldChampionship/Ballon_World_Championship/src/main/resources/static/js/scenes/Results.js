
// Teclas especiales implementadas en esta escena
var keyEnter;
var keyP;

export class Results extends Phaser.Scene{

    constructor(){
        super({key:'results'});
    }

    preload(){
        this.load.image('background', 'assets/images/background/Fondo.png');
        //this.load.image('podio', 'assets/images/sprites/PODIO.png');
        this.load.image('Victory', 'assets/images/UI/Titles/VICTORY.png');
        this.load.image('Continue', 'assets/images/UI/Buttons/BUTTON_CONTINUE.png');
        this.load.image('Exit', 'assets/images/UI/Buttons/BUTTON_EXIT.png');

        this.load.audio('result_theme', [
            'assets/music/results/results_music.ogg', // Música utilizada para la partida: https://www.youtube.com/watch?v=m3wH9K9cDcI
            'assets/music/results/results_music.mp3'
        ]);
    }

    create(){
        this.add.image(480, 312, 'background');
        this.add.image(480, 100, 'Victory');
        this.add.image(250, 280, 'Continue');
        this.add.image(700, 280, 'Exit');
        this.add.image(400, 480, 'playerArrows').setScale(2);
        this.add.image(560, 480, 'playerWASD').setScale(2);
        this.text = this.add.text(640, 200);

        //Añadir teclas especiales
        keyEnter=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyP=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        this.music = this.sound.add('result_theme');
        this.music.play();
    }

    update(){

        // Evento si la tecla ENTER es pulsada
        if (keyEnter.isDown)
        {
            this.scene.start("Level1");
            this.music.stop();
        }

        // Evento si la tecla P es pulsada
        if (keyP.isDown)
        {
            this.scene.start("mainMenu");
            this.music.stop();
        }
        }
}