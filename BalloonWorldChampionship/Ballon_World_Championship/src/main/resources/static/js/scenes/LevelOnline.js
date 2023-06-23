
import { playerObject } from '../objects/playerObject.js';
import { Bola } from '../objects/Bola.js';
import { connection } from "./WaitingRoom.js";
var msg;
//var connection;
var player1;
var player2;
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
        this.minutos = 1;
        this.segundos = 0;
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

        

        //background
        this.d = this.add.image(0, 0, "backgroundSky").setOrigin(0, 0).setScrollFactor(0, 0);
        //this.bg0 = this.add.tileSprite(0, 0, 960, 624, 'backgroundAtmosphere').setOrigin(0, 0).setScrollFactor(0, 0);
        //this.bg1 = this.add.tileSprite(0, 0, 960, 624, 'backgroundMountains').setOrigin(0, 0).setScrollFactor(0, 0);
        //this.bg2 = this.add.tileSprite(0, 0, 960, 624, 'backgroundClouds').setOrigin(0, 0).setScrollFactor(0, 0);
        //this.bg3 = this.add.tileSprite(0, 0, 960, 624, 'backgroundStars').setOrigin(0, 0).setScrollFactor(0, 0);
        //Asignación de las variables globales a unas específicas
        this.playerObject1.create(this, 200, 500);
        player1 = this.playerObject1.player;
        this.playerObject2.create(this, 200, 500);
        player2 = this.playerObject2.player;
        //ball 
        this.globo.create(this, 585, 0);
        this.bola = this.globo.ball;

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
	
    document.addEventListener("keypress", event => {
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
		});
	$(document).ready(function() {

	connection.onerror = function(e) {
		console.log("WS error: " + e);
	}
	connection.onmessage = function(msg) {
		console.log("WS message: " + msg.data);
		var message = JSON.parse(msg.data)
		//player2.setPosition(message.x,message.y);
		player2.setVelocity(message.velx, message.vely);
		console.log(message);
	}
	connection.onclose = function() {
		console.log("Closing socket");
	}					
		
})  
    }

    update() {
		msg = {
			count: 0,
			x: player1.body.x,
			y: player1.body.y,
			velx: player1.body.velocity.x /10,
			vely: player1.body.velocity.y /10
		}
        this.text.setText('Time ' + this.minutos + ':' + this.segundos);
        this.scoreCursors.setText('Player 2: ' + this.playerObject2.playerScore.toString());
        this.scoreWASD.setText('Player 1: ' + this.playerObject1.playerScore.toString());
        //background    
        //this.bg3.tilePositionX -= 0.05;
        //this.bg2.tilePositionX -= 0.2;
        //this.bg1.tilePositionX -= 0.5;
        //this.bg0.tilePositionX -= 1;
        //player
        this.playerObject1.update(this)
        this.playerObject2.update(this)
        

    }

    finDelJuego(){
		connection.close()
		this.scene.stop();
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

