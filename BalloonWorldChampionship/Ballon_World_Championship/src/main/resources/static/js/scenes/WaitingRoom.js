
// Teclas especiales implementadas en esta escena
var back;
var sessions = false;
var empezar = false;
var msg;
var start;
import { usuarioLogin } from "./Login.js";

export var connection;
export class WaitingRoom extends Phaser.Scene{

    constructor(){
        super({key:'waitRoom'});
    }
    

    preload(){
        this.load.image('background', 'assets/images/background/Fondo.png');
        this.load.image('WaitingR', 'assets/images/UI/Titles/WAITING_ROOM.png');
        this.load.image('Return', 'assets/images/UI/Buttons/BUTTON_RETURN.png');
        this.load.image('UserBackground', 'assets/images/UI/User.png');
        this.load.image('Matching', 'assets/images/UI/Titles/MATCHING.png');
        //Hacer texto de Hay un rival esperando cuando sessions sea True
		this.load.image('UserContinue', 'assets/images/UI/Buttons/BUTTON_CONTINUE.png');
        this.load.audio('menu_theme', [ //Añadimos música al juego REFERENCIA: https://phaser.io/examples/v2/audio/play-music
            'assets/music/title/title_music.ogg',  // Música utilizada para la partida: https://www.youtube.com/watch?v=QG6STlj-d7w
            'assets/music/title/title_music.mp3'
        ]);
    }

    create(){

        // Añadir imágenes
        this.add.image(480, 312, 'background');
        this.add.image(480, 100, 'WaitingR').setScale(2);
        back = this.add.image(30, 30, 'Return').setScale(0.5);
        this.add.image(270, 330, 'UserBackground');
        this.add.image(700, 330, 'Matching');
        start = this.add.image(780, 530, 'UserContinue');

        back.setInteractive();
        start.setInteractive();
        start.setActive(false);
        start.setVisible(false);
        this.usuario = this.add.text(100, 300, usuarioLogin.user,  {fontSize:'60px', fill: '#ffffff'});
        //this.music = this.sound.add('menu_theme');
        //this.sound.stopAll();
        //this.music.play();
        //this.music.loop = true;

		back.on("pointerdown", ()=>{
			this.sound.stopAll();
			connection.close();
			this.scene.start("mainMenu");
		})
				msg = {
			count: 0,
			time: 0,
			x:0,
			y:0,
			velx:0,
			vely:0,
			ballx:0,
			bally: 0

		}
		start.on("pointerdown", ()=>{

			msg.count = 1;
			connection.send(JSON.stringify(msg));

			console.log("Mandando respuesta...")
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
		//this.empezar = message.count;
		if (message.count == 2)
		{
			empezar = true;
		}

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
			//this.scene.start("LevelOn");
			start.setActive(true);
			start.setVisible(true);
		}
		else{
				start.setActive(false);
				start.setVisible(false);
		}
		if (empezar)
		{
			empezar = false;
			this.sound.stopAll();
			this.scene.start("LevelOn");
			
		}
	}

}