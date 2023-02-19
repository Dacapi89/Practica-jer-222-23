
// Teclas especiales implementadas en esta escena
var continuar;

export class Results extends Phaser.Scene{

    constructor(){
        super({key:'results'});
    }

    preload(){
        this.load.image('background', 'assets/images/background/Fondo.png');
        this.load.image('Victory', 'assets/images/UI/Titles/VICTORY.png');
        this.load.image('Continue', 'assets/images/UI/Buttons/BUTTON_CONTINUE.png');

        this.load.audio('result_theme', [
            'assets/music/results/results_music.ogg', // Música utilizada para la partida: https://www.youtube.com/watch?v=m3wH9K9cDcI
            'assets/music/results/results_music.mp3'
        ]);
    }

    create(){
        this.add.image(480, 312, 'background');
        this.add.image(480, 100, 'Victory');
        continuar = this.add.image(250, 280, 'Continue');
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