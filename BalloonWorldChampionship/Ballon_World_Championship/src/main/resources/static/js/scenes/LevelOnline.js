
import { playerObject } from '../objects/playerObject.js';
import { Bola } from '../objects/Bola.js';
import { connection } from "./WaitingRoom.js";
import { usuarioLogin } from './Login.js';
var msg;
//var connection;
var player1;
var player2;
var ball;
var player2Name;
var rrx;
var rry;
var bx = 585;
var by = 0;
var bvx = 0;
var bvy = 0;
var host;
var score1 = 0;
var score2 = 0;
export class LevelOnline extends Phaser.Scene {
    constructor() {
        super({key:'LevelOn'});
        //Variables globales
        this.globo;  
        //los player object almacenan no solo el jugador, sino sus puntuaciones, atributos y codigo comun a todos los jugadores
        this.playerObject1;
        this.playerObject2;
        this.timer;
        this.text;
        this.scoreWASD;
        this.scoreCursors;
        this.minutos = 0;
        this.segundos = 60;
        this.receivedX = -1;
        this.receivedY = -1
    }
    preload() {
		
        this.globo = new Bola("ball", 'assets/images/sprites/ball2.png', -180);
        this.playerObject1 = new playerObject("playerWASD", "assets/images/sprites/player_spain.png", 600, 400, "D", "A", "W", 0);
        this.playerObject2 = new playerObject("playerArrows", "assets/images/sprites/player_blank.png", 600, 400, "NONE", "NONE", "NONE", 0);
        //Background
        this.load.image("backgroundSky", 'assets/images/background/bgImages/sky.png');
        this.load.image("backgroundClouds", 'assets/images/background/bgImages/clouds.png');
        this.load.image("backgroundAtmosphere", 'assets/images/background/bgImages/cloud_layer.png');
        this.load.image("backgroundMountains", 'assets/images/background/bgImages/mountains.png');
        this.load.image("backgroundStars", 'assets/images/background/bgImages/stars.png');
        //tiles
        this.load.image("tiles", "assets/images/background/tilemaps/tileset.png")
        this.load.tilemapTiledJSON("leveln1", "levels/level1.json")
        //players
        this.playerObject1.preload(this, 72, 128);
        this.playerObject2.preload(this, 72, 128);
        //ball
        this.globo.preload(this)
    
        this.load.audio('game_theme', [
            'assets/music/game/game_music.ogg',  // Música utilizada para la partida: https://youtu.be/dGq3PrpSLU0
            'assets/music/game/game_music.mp3'  
        ]);

    }
    
    create() {

        	loadUserName(function(messages) {
			for (var i = 0; i < messages.length; i++)
			{
				console.log(messages[i].user);
				console.log(usuarioLogin.user);
				if (usuarioLogin.user === messages[i].user && (i + 1 == messages.length))
				{
					player2Name = messages[i-1].user;
				}
				else if (usuarioLogin.user === messages[i].user && (i + 2 == messages.length))
				{
					player2Name = messages[i+1].user;
				}
			}
		})

        //background
        this.d = this.add.image(0, 0, "backgroundSky").setOrigin(0, 0).setScrollFactor(0, 0);
        //this.bg0 = this.add.tileSprite(0, 0, 960, 624, 'backgroundAtmosphere').setOrigin(0, 0).setScrollFactor(0, 0);
        //this.bg1 = this.add.tileSprite(0, 0, 960, 624, 'backgroundMountains').setOrigin(0, 0).setScrollFactor(0, 0);
        //this.bg2 = this.add.tileSprite(0, 0, 960, 624, 'backgroundClouds').setOrigin(0, 0).setScrollFactor(0, 0);
        //this.bg3 = this.add.tileSprite(0, 0, 960, 624, 'backgroundStars').setOrigin(0, 0).setScrollFactor(0, 0);
        //Asignación de las variables globales a unas específicas
        this.playerObject1.create(this, 200, 500);
        player1 = this.playerObject1.player;
        rrx = this.receivedX;
        rry = this.receivedY;
        this.playerObject2.create(this, 200, 500);
        player2 = this.playerObject2.player;
        //ball 
        this.globo.create(this, 585, 0);
        this.bola = this.globo.ball;
        ball = this.bola

        //tiles
        this.map = this.make.tilemap({ key: "leveln1" });
        this.tileset = this.map.addTilesetImage("tileSet", "tiles");
        const tileLayer = this.map.createLayer("Map", this.tileset);
        tileLayer.setCollisionByProperty({ collides: true });


        //colisiones
        this.physics.add.collider(player1, tileLayer)
        this.physics.add.collider(player2, tileLayer)
        this.physics.add.collider(this.bola, tileLayer, () => {
            if (this.bola.body.blocked.down) {              //Si la bola toca el suelo...

                if (this.bola.turnOponent == "player2") {   //Y el player1 ha sido el último en tocar, el player1 gana un punto
                    this.bola.disableBody(true, true);
                    this.bola.enableBody(true, 585, 0, true, true);
                    console.log("HAS PERDIDO player2!!!!");
                    this.bola.turnOponent = undefined;
                    this.bola.turn = null;
                    this.playerObject1.playerScore++;
                    console.log("Puntuación P1:",this.playerObject1.playerScore);
                    console.log("Puntuación P2:",this.playerObject2.playerScore);
                }
                else if (this.bola.turnOponent == "player1" || this.bola.turnOponent == "player1") {  //Y el player2 ha sido el último en tocar, el player2 gana un punto
                    this.bola.disableBody(true, true);
                    this.bola.enableBody(true, 585, 0, true, true);
                    console.log("HAS PERDIDO player1!!!!");
                    this.bola.turnOponent = undefined;
                    this.bola.turn = null;
                    this.playerObject2.playerScore++;
                    console.log("Puntuación P1:",this.playerObject1.playerScore);
                    console.log("Puntuación P2:",this.playerObject2.playerScore);
                }
                else if (this.bola.turnOponent == undefined) {  //Ninguno ha tocado el globo todavía
                    this.bola.disableBody(true, true);
                    this.bola.enableBody(true, 585, 0, true, true);
                    console.log("NADIE HA TOCADO; SE SACA OTRA VEZ!!!");
                }
            }
        }); //Colisiones entre el globo y el suelo. Si el globo toca el suelo, se vuelve a lanzar el globo.
        this.physics.add.collider(
            player1,
            this.bola,
            () => {
                if (player1.body.touching.up && this.bola.body.touching.down) { //Si el globo toca un jugador...

                    if (this.bola.turn == "player1") {                              //Y ese jugador lo toca por segunda vez (NO SE PUEDE 
                        this.bola.disableBody(true, true);                         //TOCAR EL GLOBO 2 VECES POR TURNO), el jugador contrario gana un punto
                        this.bola.enableBody(true, 585, 0, true, true);
                        console.log("HAS PERDIDO player1!!!!");
                        this.playerObject2.playerScore +=1;
                        this.bola.turn = null;
                        this.bola.turnOponent = undefined;
                        console.log("Puntuación P1:",this.playerObject1.playerScore);
                        console.log("Puntuación P2:",this.playerObject2.playerScore);
                    }
                    else {                                                         //Empuja al globo según su dirección X
                        this.bola.setVelocity(player1.body.velocity.x, -200);
                        this.bola.turn = "player1";
                        this.bola.turnOponent = "player2";
                    }
                }
            }); //Colision con el player en función de su velocidad REFERENCIA: https://phaser.io/examples/v3/view/physics/arcade/collision-direction#

        this.physics.add.collider(
            player2,
            this.bola,
            () => {
                if (player2.body.touching.up && this.bola.body.touching.down) {

                    if (this.bola.turn == "player2") {                           //Y ese jugador lo toca por segunda vez (NO SE PUEDE
                        this.bola.disableBody(true, true);                      //TOCAR EL GLOBO 2 VECES POR TURNO), el jugador contrario gana un punto
                        this.bola.enableBody(true, 585, 0, true, true);
                        console.log("HAS PERDIDO player2!!!!");
                        this.playerObject1.playerScore++;
                        this.bola.turn = null;
                        this.bola.turnOponent = undefined;
                        console.log("Puntuación P1:",this.playerObject1.playerScore);
                        console.log("Puntuación P2:",this.playerObject2.playerScore);
                    }
                    else {                                                         //Empuja al globo según su dirección X
                        this.bola.setVelocity(player2.body.velocity.x, -200);
                        this.bola.turn = "player2";
                        this.bola.turnOponent = "player1";
                    }
                }
            });  


        //Cronometro
        this.time.addEvent({  //Cada segundo llama a la función actualizarTiempo REFERENCIAS: https://www.youtube.com/watch?v=2esow22Z0fc
            delay: 1000,
            loop: true,
            callback: () => {
                this.actualizarTiempo()
            }
        })
        this.time.addEvent({  //Cada segundo llama a la función actualizarTiempo REFERENCIAS: https://www.youtube.com/watch?v=2esow22Z0fc
            delay: 17,//mas bajo imposible
            loop: true,
            callback: () => {
                connection.send(JSON.stringify(msg));
            }
        })
        this.text = this.add.text(40, 32, 'Time ' + this.minutos + ':' + this.segundos ,  {fontSize: '32px', fill: '#000000'});

        //creation of the score

        this.scoreWASD = this.add.text(400, 32, 'Player 2: 0', {fontSize: '32px', fill: '#000000'});
        this.scoreCursors = this.add.text(700, 32, 'Player 1: 0', {fontSize: '32px', fill: '#000000'});

        this.music = this.sound.add('game_theme');

        this.music.play();
        this.music.loop = true;
    /*    
    connection = new WebSocket('ws://'+location.host+'/pos');    
	connection.onopen = function() {
		console.log("Opening socket");
	}*/
	
    /*document.addEventListener("keypress", event => {

			if(event.key == 'd') {	
				msg.velx = 60 //velocidad del jugador entre 10 por que le da la gana al programa
				connection.send(JSON.stringify(msg));
				console.log("Mandando posición..")
			}
			if(event.key == 'a') {	
				msg.velx = -60				
				connection.send(JSON.stringify(msg));
				console.log("Mandando posición..")
			}
			if(event.key == 'w' && player1.body.blocked.down) {		
				msg.vely = -40		
				connection.send(JSON.stringify(msg));
				console.log("Mandando posición..")
			}

		});
	document.addEventListener("keyup", event => {
		if(event.key == 'd') {	
			msg.velx = 0		
			connection.send(JSON.stringify(msg));
			console.log("Mandando posición..")
		}
		if(event.key == 'a') {	
			msg.velx = 0				
			connection.send(JSON.stringify(msg));
			console.log("Mandando posición..")
		}	
		});*/
	$(document).ready(function() {

	connection.onerror = function(e) {
		console.log("WS error: " + e);
	}
	connection.onmessage = function(msg) {
		console.log("WS message: " + msg.data);
		var message = JSON.parse(msg.data)
		//no funciona por alguna magia arcana desconocida hasta la fecha
		//player2.setPosition(message.x,message.y);

		rrx = Math.round(message.x);
		rry = Math.round(message.y);
		if(message.host !== usuarioLogin.user)
		{
			bx = Math.round(message.ballx);
			by = Math.round(message.bally);
			bvx = Math.round(message.ballvelx);
			bvy = Math.round(message.ballvely);
			score1 = message.score1;
			score2 = message.score2;
		}

		this.segundos = message.time;
		host = message.host;

		console.log("El tiempo es: "+ message.time);
		//ball.setPosition(message.ballx,message.bally)
		player2.setVelocity(message.velx, message.vely);
		//console.log(message);
	}
	connection.onclose = function() {
		console.log("Closing socket");
	}					
		
})  
    }

    update() {
		msg = {
			count: 0,
			x: player1.x,
			y: player1.y,
			velx: player1.body.velocity.x /10,
			vely: player1.body.velocity.y /10,
			ballx: ball.x,
			bally: ball.y,
			ballvelx: ball.body.velocity.x,
			ballvely: ball.body.velocity.y,		
			score1: this.playerObject1.playerScore,
			score2: this.playerObject2.playerScore			
		}
		
        this.text.setText('Time ' + this.minutos + ':' + this.segundos);
        if(host === usuarioLogin.user)
        {
			this.scoreCursors.setText(player2Name +': ' + this.playerObject2.playerScore.toString());
        	this.scoreWASD.setText(usuarioLogin.user+': ' + this.playerObject1.playerScore.toString());
		}
		else{
			    this.scoreCursors.setText(player2Name +': ' + score1);
        		this.scoreWASD.setText(usuarioLogin.user+': ' + score2);
		}
        usuarioLogin.score = this.playerObject1.playerScore;
        console.log(usuarioLogin.score);
        //background    
        //this.bg3.tilePositionX -= 0.05;
        //this.bg2.tilePositionX -= 0.2;
        //this.bg1.tilePositionX -= 0.5;
        //this.bg0.tilePositionX -= 1;
        //player
        this.playerObject1.update(this)
        if (rrx >= 0 && rry >= 0)
        {
			player2.setPosition((rrx+player2.x)/2,(rry+player2.y)/2)
			rrx = -1;
			rry = -1;
		}
		if (bx >= 0 && by >= 0){
			if (ball.y > by){//politicas de la bola para que se sincronice con uno solo
				//this.bola.setPosition(bx * 1/2 +ball.x * 1/2 ,by * 1/2 + ball.y * 1/2 );
				//this.bola.setVelocity(player2.body.velocity.x, -200);
				//bx = -1
				//by = -1
			}
			else if(ball.y == by && ball.x > bx){
				//this.bola.setPosition(bx * 1/2 +ball.x * 1/2 ,by * 1/2 + ball.y * 1/2 );
				//this.bola.setVelocity(player2.body.velocity.x, -200);
				//bx = -1
				//by = -1
			}		
		}
		if(host !== usuarioLogin.user)
		{
			this.bola.setPosition(bx  ,by );
			this.bola.setVelocity(bvx  ,bvy );
		}
        this.playerObject2.update(this)
        

    }

    finDelJuego(){
		connection.send(JSON.stringify(msg));
		connection.close()
		this.scene.stop();
		if(host !== usuarioLogin.user)
			usuarioLogin.score = score2;
		updateUser(usuarioLogin);
		if(usuarioLogin.user === host)
		{
			if (this.playerObject1.playerScore > this.playerObject2.playerScore){
            	this.scene.start('results1');
            	this.music.stop();
        	}
        	else if (this.playerObject1.playerScore < this.playerObject2.playerScore){
            	this.scene.start('results2');
            	this.music.stop();
        	}
        	else {
            	this.scene.start('results');
            	this.music.stop();
        	}
		}
		else{
			        if (score2 > score1){
            this.scene.start('results1');
            this.music.stop();
        }
        else if (score2 < score1){
            this.scene.start('results2');
            this.music.stop();
        }
        else {
            this.scene.start('results');
            this.music.stop();
        }
		}

        
    }
    actualizarTiempo() {
        if(this.segundos == 0) {
            this.minutos--;
            if (this.minutos < 0) {
                this.finDelJuego();
                this.minutos = 0;
            }
            this.segundos = 60;
        }
        this.segundos--;
    }
    
}
function loadUserName(callback) {
    $.ajax({
        url: 'http://'+location.host+'/users'
    }).done(function (messages) {
        //console.log(JSON.stringify(messages));
		callback(messages);
    })
}

function updateUser(user) {
    $.ajax({
        method: 'PUT',
        url: 'http://'+location.host+'/users/' + user.id,
        data: JSON.stringify(user),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (user) {
        console.log("Updated user: " + JSON.stringify(user))
    })
}
