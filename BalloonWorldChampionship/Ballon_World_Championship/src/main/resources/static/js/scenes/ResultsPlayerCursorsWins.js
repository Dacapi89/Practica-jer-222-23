
// Teclas especiales implementadas en esta escena
var continuar;

export class ResultsPlayerCursorsWins extends Phaser.Scene{

    constructor(){
        super({key:'results2'});
    }

    preload(){
        this.load.image('background', 'assets/images/background/Fondo.png');
        this.load.image('Victory', 'assets/images/UI/Titles/VICTORY.png');
        this.load.image('Continue', 'assets/images/UI/Buttons/BUTTON_CONTINUE.png');
        this.load.image("playerWASD", "assets/images/sprites/player_spain.png");
        this.load.image("playerArrows", "assets/images/sprites/player_blank.png");

        this.load.audio('result_theme', [
            'assets/music/results/results_music.ogg',
            'assets/music/results/results_music.mp3'
        ]);
    }

    create(){
        this.add.image(480, 312, 'background');
        this.add.image(480, 100, 'Victory');
        continuar = this.add.image(480, 280, 'Continue');
        this.add.image(480, 485, 'playerArrows').setScale(2);
        //this.add.image(500, 560, 'playerWASD');

        continuar.setInteractive();
        
        continuar.on("pointerdown", ()=>{
			this.scene.start("mainMenu");
            this.music.stop();
		})

        this.music = this.sound.add('result_theme');

        this.music.play();
    }

}