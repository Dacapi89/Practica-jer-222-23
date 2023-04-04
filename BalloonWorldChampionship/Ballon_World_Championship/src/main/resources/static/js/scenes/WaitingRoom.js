
// Teclas especiales implementadas en esta escena
//var local;
var online;
var back;
var sessions = false;
export var connection;
export class WaitingRoom extends Phaser.Scene{

    constructor(){
        super({key:'waitRoom'});
    }

    preload(){
        this.load.image('background', 'assets/images/background/Fondo.png');
        //this.load.image('BotonLocal', 'assets/images/UI/Buttons/BUTTON_LOCAL.png');
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
        //local = this.add.image(700, 280, 'BotonLocal');
        online = this.add.image(250, 280, 'BotonOnline');
        back = this.add.image(30, 30, 'Return').setScale(0.5);

        //local.setInteractive();
        online.setInteractive();
        back.setInteractive();

        this.music = this.sound.add('menu_theme');
        this.sound.stopAll();
        this.music.play();
        this.music.loop = true;
        
        //local.on("pointerdown", ()=>{
		//	this.scene.start("level1");
		//})
		
		online.on("pointerdown", ()=>{
			this.scene.start("LevelOn");
		})

		back.on("pointerdown", ()=>{
			connection.close();
			this.scene.start("selec");
		})
		
		connection = new WebSocket('ws://'+location.host+'/pos');    
		connection.onopen = function() {
		console.log("Opening socket");
		}
			$(document).ready(function() {

	connection.onerror = function(e) {
		console.log("WS error: " + e);
	}
	connection.onmessage = function(msg) {
		console.log("WS message: " + msg.data);
		var message = JSON.parse(msg.data)
		//player2.setVelocity(message.x, message.y);
		console.log(message);
		sessions = message.sessions;
		console.log(message.sessions);
	}
	connection.onclose = function() {
		console.log("Closing socket");
	}					
		
	})
    }
    
	update()
	{
		if (sessions == true)
		{
			this.scene.start("LevelOn");
		}
	}

}