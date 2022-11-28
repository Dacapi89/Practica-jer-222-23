
import { player } from '../objects/player.js';
import { Bola } from '../objects/Bola.js';
function jump(object) {

}
class Level1 extends Phaser.Scene {
    constructor() {
        super(Level1)
    }
    globo = new Bola("ball", 'assets/images/sprites/ball.png', -180);
    playerWASD = new player("playerWASD", "assets/images/sprites/player_spain.png", 300, 400, "D", "A", "W");
    playerArrows = new player("playerArrows", "assets/images/sprites/player_blank.png", 300, 400, "RIGHT", "LEFT", "UP");
    preload() {
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



    }
    create() {
        //background
        this.d = this.add.image(0, 0, "backgroundSky").setOrigin(0, 0).setScrollFactor(0, 0).setScale(4);
        this.bg0 = this.add.tileSprite(0, 0, 320, 200, 'backgroundAtmosphere').setOrigin(0, 0).setScrollFactor(0, 0).setScale(4);
        this.bg1 = this.add.tileSprite(0, 0, 320, 200, 'backgroundMountains').setOrigin(0, 0).setScrollFactor(0, 0).setScale(4);
        this.bg2 = this.add.tileSprite(0, 0, 320, 200, 'backgroundClouds').setOrigin(0, 0).setScrollFactor(0, 0).setScale(4);
        this.bg3 = this.add.tileSprite(0, 0, 320, 200, 'backgroundStars').setOrigin(0, 0).setScrollFactor(0, 0).setScale(4);

        //players (setCollideWorldBorder,setvelocity, keypress,anims, etc)
        this.playerWASD.create(this, 0, 500);
        this.player1 = this.playerWASD.player;
        this.player1.setScale(2);
        this.playerArrows.create(this, 800, 600);
        this.player2 = this.playerArrows.player;
        this.player2.setScale(2);
        //ball 
        this.globo.create(this, 100, 0);
        this.bola = this.globo.ball;
        this.bola.setScale(2);

        //tiles
        this.map = this.make.tilemap({ key: "leveln1" });
        this.tileset = this.map.addTilesetImage("tileSet", "tiles");
        const tileLayer = this.map.createLayer("Map", this.tileset).setScale(4);
        tileLayer.setCollisionByProperty({ collides: true });


        //colisiones
        this.physics.add.collider(this.player1, tileLayer)
        this.physics.add.collider(this.player2, tileLayer)
        this.physics.add.collider(this.bola, tileLayer, () => {
            if (this.bola.body.blocked.down) { //Con el body lo que hago es que cuando la parte del globo toca el suelo, entra en el if
                this.bola.disableBody(true, true);
                this.bola.enableBody(true, 0, 0, true, true);
                console.log("HAS PERDIDO!!!!");
            }
        }); //Colisiones entre el globo y el suelo. Si el globo toca el suelo, se vuelve a lanzar el globo.


        this.physics.add.collider(
            this.player1,
            this.bola,
            () => {
                if (this.player1.body.touching.up && this.bola.body.touching.down) {
                    this.bola.setVelocity(this.player1.body.velocity.x, -200);
                }
            }); //Colision con el player en función de su velocidad REFERENCIA: https://phaser.io/examples/v3/view/physics/arcade/collision-direction#

        this.physics.add.collider(
            this.player2,
            this.bola,
            () => {
                if (this.player2.body.touching.up && this.bola.body.touching.down) {
                    this.bola.setVelocity(this.player2.body.velocity.x, -200);
                }
            }); //Colision con el player en función de su velocidad REFERENCIA: https://phaser.io/examples/v3/view/physics/arcade/collision-direction#   
    }
    update() {
        //background    
        this.bg3.tilePositionX -= 0.05;
        this.bg2.tilePositionX -= 0.2;
        this.bg1.tilePositionX -= 0.5;
        this.bg0.tilePositionX -= 1;
        //player
        this.playerWASD.update(this)
        this.playerArrows.update(this)
    }
}
export { Level1 };