
// Teclas especiales implementadas en esta escena
var continuar;

export class ResultsPlayerWASDWins extends Phaser.Scene{

    constructor(){
        super({key:'results1'});
    }

    preload(){
        this.load.image('background', 'assets/images/background/Fondo.png');
        this.load.image('Victory', 'assets/images/UI/Titles/VICTORY.png');
        this.load.image('Continue', 'assets/images/UI/Buttons/BUTTON_CONTINUE.png');
        this.load.image("playerWASD", "assets/images/sprites/player_spain.png");
        this.load.image("playerArrows", "assets/images/sprites/player_blank.png");
        this.load.image('Ranking', 'assets/images/UI/Buttons/RANKING.png');

        this.load.audio('result_theme', [
            'assets/music/results/results_music.ogg',
            'assets/music/results/results_music.mp3'
        ]);
    }

    create(){
        this.add.image(480, 312, 'background');
        this.add.image(480, 100, 'Victory').setScale(2);
        continuar = this.add.image(250, 250, 'Continue').setScale(0.75);
        ranking = this.add.image(650, 250, 'Ranking').setScale(0.75);
        //this.add.image(500, 560, 'playerArrows');
        this.add.image(480, 485, 'playerWASD').setScale(2);

        continuar.setInteractive();
        
        continuar.on("pointerdown", ()=>{
			this.scene.start("mainMenu");
            this.music.stop();
		})

        this.music = this.sound.add('result_theme');

        this.music.play();
    }

}