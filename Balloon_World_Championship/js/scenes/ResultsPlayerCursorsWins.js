
// Teclas especiales implementadas en esta escena
var keyEnter;
var keyP;

export class ResultsPlayerCursorsWins extends Phaser.Scene{

    constructor(){
        super({key:'results2'});
    }

    preload(){
        this.load.image('background', 'assets/images/background/Fondo.png');
        //this.load.image('podio', 'assets/images/sprites/PODIO.png');
        this.load.image('Victory', 'assets/images/UI/Titles/VICTORY.png');
        this.load.image('Continue', 'assets/images/UI/Buttons/BUTTON_CONTINUE.png');
        this.load.image('Exit', 'assets/images/UI/Buttons/BUTTON_EXIT.png');
        this.load.image("playerWASD", "assets/images/sprites/player_spain.png");
        this.load.image("playerArrows", "assets/images/sprites/player_blank.png");

        this.load.audio('result_theme', [
            'assets/music/results/results_music.ogg',
            'assets/music/results/results_music.mp3'
        ]);
    }

    create(){
        this.add.image(480, 312, 'background');
        //this.add.image(480, 624, 'podio');
        this.add.image(480, 100, 'Victory');
        this.add.image(250, 280, 'Continue');
        this.add.image(700, 280, 'Exit');
        this.add.image(480, 485, 'playerArrows');
        //this.add.image(500, 560, 'playerWASD');

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