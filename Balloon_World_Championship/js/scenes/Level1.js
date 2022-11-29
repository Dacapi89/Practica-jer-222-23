
import { player } from '../objects/player.js';
import { Bola } from '../objects/Bola.js';

var keyP;

function jump(object) {

}
class Level1 extends Phaser.Scene {
    constructor() {
        super({key:'Level1'});
        //Variables globales
        this.globo;   
        this.playerWASD;
        this.playerArrows;
        this.timer;
        this.text;
        this.scoreWASD;
        this.scoreCursors;
        this.minutos = 1;
        this.segundos = 0;
    }
    preload() {
        this.globo = new Bola("ball", 'assets/images/sprites/ball2.png', -180);
        this.playerWASD = new player("playerWASD", "assets/images/sprites/player_spain.png", 300, 400, "D", "A", "W", 0);
        this.playerArrows = new player("playerArrows", "assets/images/sprites/player_blank.png", 300, 400, "RIGHT", "LEFT", "UP", 0);
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
        this.playerWASD.preload(this, 36, 64);
        this.playerArrows.preload(this, 36, 64);
        //ball
        this.globo.preload(this)
        //Pause button
        this.load.image('pause', 'assets/images/UI/Buttons/BUTTON_PAUSE.png');
    
        this.load.audio('game_theme', [
            'assets/music/game/game_music.ogg',  // Música utilizada para la partida: https://youtu.be/dGq3PrpSLU0
            'assets/music/game/game_music.mp3'  
        ]);

    }
    
    create() {

        

        //background
        this.d = this.add.image(0, 0, "backgroundSky").setOrigin(0, 0).setScrollFactor(0, 0).setScale(4);
        this.bg0 = this.add.tileSprite(0, 0, 320, 200, 'backgroundAtmosphere').setOrigin(0, 0).setScrollFactor(0, 0).setScale(4);
        this.bg1 = this.add.tileSprite(0, 0, 320, 200, 'backgroundMountains').setOrigin(0, 0).setScrollFactor(0, 0).setScale(4);
        this.bg2 = this.add.tileSprite(0, 0, 320, 200, 'backgroundClouds').setOrigin(0, 0).setScrollFactor(0, 0).setScale(4);
        this.bg3 = this.add.tileSprite(0, 0, 320, 200, 'backgroundStars').setOrigin(0, 0).setScrollFactor(0, 0).setScale(4);

        //players (setCollideWorldBorder,setvelocity, keypress,anims, etc)

        //Asignación de las variables globales a unas específicas
        this.playerWASD.create(this, 300, 700);
        this.player1 = this.playerWASD.player;
        this.player1.setScale(2);
        this.playerArrows.create(this, 1300, 650);
        this.player2 = this.playerArrows.player;
        this.player2.setScale(2);
        //ball 
        this.globo.create(this, 780, 0);
        this.bola = this.globo.ball;
        this.bola.setScale(2);

        //tiles
        this.map = this.make.tilemap({ key: "leveln1" });
        this.tileset = this.map.addTilesetImage("tileSet", "tiles");
        const tileLayer = this.map.createLayer("Map", this.tileset).setScale(4);
        tileLayer.setCollisionByProperty({ collides: true });

        //pause button
        this.add.image(1200, 790, 'pause');


        //colisiones
        this.physics.add.collider(this.player1, tileLayer)
        this.physics.add.collider(this.player2, tileLayer)
        this.physics.add.collider(this.bola, tileLayer, () => {
            if (this.bola.body.blocked.down) {              //Si la bola toca el suelo...

                if (this.bola.turnOponent == "player2") {   //Y el player1 ha sido el último en tocar, el player1 gana un punto
                    this.bola.disableBody(true, true);
                    this.bola.enableBody(true, 780, 0, true, true);
                    console.log("HAS PERDIDO player2!!!!");
                    this.bola.turnOponent = undefined;
                    this.bola.turn = null;
                    this.playerWASD.playerScore++;
                    console.log("Puntuación P1:",this.playerWASD.playerScore);
                    console.log("Puntuación P2:",this.playerArrows.playerScore);
                }
                else if (this.bola.turnOponent == "player1" || this.bola.turnOponent == "player1") {  //Y el player2 ha sido el último en tocar, el player2 gana un punto
                    this.bola.disableBody(true, true);
                    this.bola.enableBody(true, 780, 0, true, true);
                    console.log("HAS PERDIDO player1!!!!");
                    this.bola.turnOponent = undefined;
                    this.bola.turn = null;
                    this.playerArrows.playerScore++;
                    console.log("Puntuación P1:",this.playerWASD.playerScore);
                    console.log("Puntuación P2:",this.playerArrows.playerScore);
                }
                else if (this.bola.turnOponent == undefined) {  //Ninguno ha tocado el globo todavía
                    this.bola.disableBody(true, true);
                    this.bola.enableBody(true, 780, 0, true, true);
                    console.log("NADIE HA TOCADO; SE SACA OTRA VEZ!!!");
                }
            }
        }); //Colisiones entre el globo y el suelo. Si el globo toca el suelo, se vuelve a lanzar el globo.


        this.physics.add.collider(
            this.player1,
            this.bola,
            () => {
                if (this.player1.body.touching.up && this.bola.body.touching.down) { //Si el globo toca un jugador...

                    if (this.bola.turn == "player1") {                              //Y ese jugador lo toca por segunda vez (NO SE PUEDE 
                        this.bola.disableBody(true, true);                         //TOCAR EL GLOBO 2 VECES POR TURNO), el jugador contrario gana un punto
                        this.bola.enableBody(true, 780, 0, true, true);
                        console.log("HAS PERDIDO player1!!!!");
                        this.playerArrows.playerScore +=1;
                        this.bola.turn = null;
                        this.bola.turnOponent = undefined;
                        console.log("Puntuación P1:",this.playerWASD.playerScore);
                        console.log("Puntuación P2:",this.playerArrows.playerScore);
                    }
                    else {                                                         //Empuja al globo según su dirección X
                        this.bola.setVelocity(this.player1.body.velocity.x, -200);
                        this.bola.turn = "player1";
                        this.bola.turnOponent = "player2";
                    }
                }

            }); //Colision con el player en función de su velocidad REFERENCIA: https://phaser.io/examples/v3/view/physics/arcade/collision-direction#

        this.physics.add.collider(
            this.player2,
            this.bola,
            () => {
                if (this.player2.body.touching.up && this.bola.body.touching.down) {

                    if (this.bola.turn == "player2") {                           //Y ese jugador lo toca por segunda vez (NO SE PUEDE
                        this.bola.disableBody(true, true);                      //TOCAR EL GLOBO 2 VECES POR TURNO), el jugador contrario gana un punto
                        this.bola.enableBody(true, 780, 0, true, true);
                        console.log("HAS PERDIDO player2!!!!");
                        this.playerWASD.playerScore++;
                        this.bola.turn = null;
                        this.bola.turnOponent = undefined;
                        console.log("Puntuación P1:",this.playerWASD.playerScore);
                        console.log("Puntuación P2:",this.playerArrows.playerScore);
                    }
                    else {                                                         //Empuja al globo según su dirección X
                        this.bola.setVelocity(this.player2.body.velocity.x, -200);
                        this.bola.turn = "player2";
                        this.bola.turnOponent = "player1";
                    }
                }
            });  

        // special keys
        keyP=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

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

        this.scoreWASD = this.add.text(500, 32, 'Player 2: 0', {fontSize: '32px', fill: '#000000'});
        this.scoreCursors = this.add.text(800, 32, 'Player 1: 0', {fontSize: '32px', fill: '#000000'});

        this.music = this.sound.add('game_theme');

        this.music.play();
        this.music.loop = true;
    }

    update() {
        this.text.setText('Time ' + this.minutos + ':' + this.segundos);
        this.scoreCursors.setText('Player 2: ' + this.playerArrows.playerScore.toString());
        this.scoreWASD.setText('Player 1: ' + this.playerWASD.playerScore.toString());

        //background    
        this.bg3.tilePositionX -= 0.05;
        this.bg2.tilePositionX -= 0.2;
        this.bg1.tilePositionX -= 0.5;
        this.bg0.tilePositionX -= 1;
        //player
        this.playerWASD.update(this)
        this.playerArrows.update(this)

        //pause menu
        if (keyP.isDown){

            this.scene.pause("Level1");
            this.scene.launch("pause", "Level1");
        } 

    }

    finDelJuego(){
        if (this.playerWASD.playerScore > this.playerArrows.playerScore){
            this.scene.start('results1');
            this.music.stop();
        }
        else if (this.playerWASD.playerScore < this.playerArrows.playerScore){
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
export { Level1 };