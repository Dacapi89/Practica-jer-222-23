
import { player} from '../objects/player.js';
import { Bola} from '../objects/Bola.js';
function jump(object){

}
class Level1 extends Phaser.Scene{
    constructor(){
        super(Level1)
    }  
    globo= new Bola("ball",'assets/images/sprites/ball.png',-200)
    playerWASD = new player("playerWASD","assets/images/sprites/player_spain.png",100,100,"D","A","W")
    preload()
    {    
        //Background
        this.load.image("backgroundSky",'assets/images/background/bgImages/sky.png');
        this.load.image("backgroundClouds",'assets/images/background/bgImages/clouds.png');  
        this.load.image("backgroundAtmosphere",'assets/images/background/bgImages/cloud_layer.png');  
        this.load.image("backgroundMountains",'assets/images/background/bgImages/mountains.png');  
        this.load.image("backgroundStars",'assets/images/background/bgImages/stars.png');   
        //tiles
        this.load.image("tiles","assets/images/background/tilemaps/tileset.png")
        this.load.tilemapTiledJSON("leveln1","levels/level1.json")          
        //players
        this.playerWASD.preload(this,36,64);
        //ball
        this.globo.preload(this)

        

    }
    create()
    {
        //background
        this.d =this.add.image(0,0,"backgroundSky").setOrigin(0,0).setScrollFactor(0,0)
        this.bg0=this.add.tileSprite(0,0,320,200,'backgroundAtmosphere').setOrigin(0,0).setScrollFactor(0,0)
        this.bg1=this.add.tileSprite(0,0,320,200,'backgroundMountains').setOrigin(0,0).setScrollFactor(0,0)
        this.bg2=this.add.tileSprite(0,0,320,200,'backgroundClouds').setOrigin(0,0).setScrollFactor(0,0)
        this.bg3=this.add.tileSprite(0,0,320,200,'backgroundStars').setOrigin(0,0).setScrollFactor(0,0)       

        //players (setCollideWorldBorder,setvelocity, keypress,anims, etc)
        this.playerWASD.create(this,0,0);
        this.player1=this.playerWASD.player;

        //ball 
        this.globo.create(this,0,0)
        this.bola=this.globo.ball;

        //tiles
        this.map = this.make.tilemap({ key : "leveln1" })
        this.tileset = this.map.addTilesetImage("tileSet", "tiles")
        const tileLayer= this.map.createLayer("Map",this.tileset)
        tileLayer.setCollisionByProperty({collides: true})
        
        
        //colisiones
        this.physics.add.collider(this.player1,tileLayer)
        this.physics.add.collider(this.bola, tileLayer, ()=> {
            if(this.bola.body.onFloor) { //Con el body lo que hago es que cuando la parte del globo toca el suelo, entra en el if
                this.bola.disableBody(true, true);
                this.bola.enableBody(true, 0, 0, true, true);
                console.log("HAS PERDIDO!!!!");
            }
        }); //Colisiones entre el globo y el suelo. Si el globo toca el suelo, se vuelve a lanzar el globo.


        this.physics.add.collider(
            this.player1,
            this.bola,
            () =>
            {
                if (this.player1.body.touching.up && this.bola.body.touching.down)
                {
                    this.bola.setVelocity(this.player1.body.velocity.x,-200);
                }
            }); //Colision con el player en función de su velocidad REFERENCIA: https://phaser.io/examples/v3/view/physics/arcade/collision-direction#
    }
    update()
    {      
        //background    
        this.bg3.tilePositionX-=0.05;
        this.bg2.tilePositionX-=0.2;
        this.bg1.tilePositionX-=0.5;
        this.bg0.tilePositionX-=1;
        //player
        this.playerWASD.update(this)
        //ball
    }
}
export { Level1 };