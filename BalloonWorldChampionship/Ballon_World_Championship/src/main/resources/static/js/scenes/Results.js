
// Teclas especiales implementadas en esta escena
var continuar;
var ranking;

export class Results extends Phaser.Scene{

    constructor(){
        super({key:'results'});
        this.score1;
        this.score2;
        this.score3;
        this.puesto1;
        this.puesto2;
        this.puesto3;
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
		
		loadRanking(function(messages) {
			this.puesto1 = messages[0].score;
			this.puesto2 = messages[1].score;
			this.puesto3 = messages[2].score;
		})
		
		//this.puesto1.visible = false;
		//this.puesto2.visible = false;
		//this.puesto3.visible = false;
		
        this.add.image(480, 312, 'background');
        this.add.image(480, 100, 'Victory').setScale(2);
        continuar = this.add.image(250, 250, 'Continue').setScale(0.75);
        ranking = this.add.image(650, 250, 'Ranking').setScale(0.75);
        this.add.image(400, 480, 'playerArrows').setScale(2);
        this.add.image(560, 480, 'playerWASD').setScale(2);
        this.text = this.add.text(640, 200);
        
        this.score1 = this.add.text(50, 32, '1º SCORE: 0', {fontSize: '32px', fill: '#000000'});
        this.score2 = this.add.text(380, 32, '2º SCORE: 0', {fontSize: '32px', fill: '#000000'});
        this.score3 = this.add.text(700, 32, '3º SCORE: 0', {fontSize: '32px', fill: '#000000'});

        continuar.setInteractive();
        ranking.setInteractive();
        
        continuar.on("pointerdown", ()=>{
			this.scene.start("mainMenu");
            this.music.stop();
		})
		
		ranking.on("pointerdown", ()=>{
			this.scene.start("rank");
			//this.puesto1.visible = true;
			//this.puesto2.visible = true;
			//this.puesto3.visible = true;
		})

        this.music = this.sound.add('result_theme');
        this.music.play();
    }

	update() {
        //this.score1.setText('1º SCORE: ' + puesto1.toString());
        //this.score2.setText('2º SCORE: ' + puesto2.toString());
        //this.score3.setText('3º SCORE: ' + puesto3.toString());
    }

}

function loadRanking(callback) { // GET RANKING
    $.ajax({
        url: 'http://' + location.host + '/ranking'
    }).done(function (messages) {
		callback(messages);
    })
}