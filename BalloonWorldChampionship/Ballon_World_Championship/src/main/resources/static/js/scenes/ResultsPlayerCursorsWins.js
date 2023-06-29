
// Teclas especiales implementadas en esta escena
var continuar;

// donde se guardan los rankings
var puesto1;
var puesto2;
var puesto3;

// donde se guardan los rankings
var UserPuesto1;
var UserPuesto2;
var UserPuesto3;

// mensajes que muestran el ranking
var score1; 
var score2;
var score3;

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
        this.load.image('Ranking', 'assets/images/UI/Buttons/RANKING.png');
        this.load.image('Deco', 'assets/images/UI/deco.png');

        this.load.audio('result_theme', [
            'assets/music/results/results_music.ogg',
            'assets/music/results/results_music.mp3'
        ]);
    }

    create(){
        this.add.image(480, 312, 'background');
        this.add.image(480, 100, 'Victory').setScale(2);
        continuar = this.add.image(800, 450, 'Continue').setScale(0.75);
        this.add.image(480, 290, 'Deco').setScale(0.75);
        this.add.image(480, 230, 'Ranking').setScale(0.75);
        this.add.image(480, 485, 'playerArrows').setScale(2);
        
        score1 = this.add.text(50, 275, '1º SCORE: 0', {fontSize: '32px', fill: '#000000'});
        score2 = this.add.text(380, 275, '2º SCORE: 0', {fontSize: '32px', fill: '#000000'});
        score3 = this.add.text(700, 275, '3º SCORE: 0', {fontSize: '32px', fill: '#000000'});

        continuar.setInteractive();
        
        continuar.on("pointerdown", ()=>{
			this.scene.start("mainMenu");
            this.music.stop();
		})
		
		
        this.music = this.sound.add('result_theme');
        this.music.play();
        
        loadRanking(function(messages) {
			console.log(messages);
			puesto1 = messages[0].score;
			puesto2 = messages[1].score;
			puesto3 = messages[2].score;
			UserPuesto1 = messages[0].user;
			UserPuesto2 = messages[1].user;
			UserPuesto3 = messages[2].user;
			console.log(puesto1);
			
			console.log(puesto1);
        	score1.setText(UserPuesto1 + ': ' + puesto1);
        	score2.setText(UserPuesto2 + ': ' + puesto2);
        	score3.setText(UserPuesto3 + ': ' + puesto3);
		}) 
    }

}

function loadRanking(callback) { // GET RANKING
    $.ajax({
        url: 'http://' + location.host + '/ranking'
    }).done(function (messages) {
		callback(messages);
    })
}