
// Teclas especiales implementadas en esta escena
var continuar;
//var ranking;

export class Results extends Phaser.Scene{

    constructor(){
        super({key:'results'});
    }

    preload(){
        this.load.image('background', 'assets/images/background/Fondo.png');
        this.load.image('Victory', 'assets/images/UI/Titles/VICTORY.png');
        this.load.image('Continue', 'assets/images/UI/Buttons/BUTTON_CONTINUE.png');
        this.load.image('Ranking', 'assets/images/UI/Buttons/RANKING.png');

        this.load.audio('result_theme', [
            'assets/music/results/results_music.ogg', // Música utilizada para la partida: https://www.youtube.com/watch?v=m3wH9K9cDcI
            'assets/music/results/results_music.mp3'
        ]);
    }

    create(){
        this.add.image(480, 312, 'background');
        this.add.image(480, 100, 'Victory').setScale(2);
        continuar = this.add.image(250, 250, 'Continue').setScale(0.75);
        this.add.image(650, 250, 'Ranking').setScale(0.75);
        this.add.image(400, 480, 'playerArrows').setScale(2);
        this.add.image(560, 480, 'playerWASD').setScale(2);
        this.text = this.add.text(640, 200);

        continuar.setInteractive();
        
        continuar.on("pointerdown", ()=>{
			this.scene.start("mainMenu");
            this.music.stop();
		})

        this.music = this.sound.add('result_theme');
        this.music.play();
    }

}