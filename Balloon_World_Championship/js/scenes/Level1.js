import { Bola} from '../objects/Bola.js';
function jump(object){

}
class Level1 extends Phaser.Scene{
    constructor(){
        super(Level1)
        this.globo;
    }
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
        
        //ball
        this.globo = new Bola(this);

        

    }
    create()
    {
        //background
        this.add.image(0,0,"backgroundSky").setOrigin(0,0).setScrollFactor(0,0)
        this.bg0=this.add.tileSprite(0,0,320,200,'backgroundAtmosphere').setOrigin(0,0).setScrollFactor(0,0)
        this.bg1=this.add.tileSprite(0,0,320,200,'backgroundMountains').setOrigin(0,0).setScrollFactor(0,0)
        this.bg2=this.add.tileSprite(0,0,320,200,'backgroundClouds').setOrigin(0,0).setScrollFactor(0,0)
        this.bg3=this.add.tileSprite(0,0,320,200,'backgroundStars').setOrigin(0,0).setScrollFactor(0,0)
        //tiles
        const map = this.make.tilemap({ key : "leveln1" })
        this.tileset = map.addTilesetImage("tileSet", "tiles")
        this.tileLayer= map.createLayer("Map",this.tileset)
        this.tileLayer.setCollisionByProperty({collision: true})
        //this.tileLayer = this.physics.add.staticGroup(); NECESITO LA PROPIEDAD BODY!!!!!!!!
        //players (setCollideWorldBorder,setvelocity, keypress,anims, etc)

        //ball
         this.globo.create();

        //Collisions
        this.physics.add.collider(this.globo.getBola(), this.tileLayer, function (globo, suelo) {
            if(suelo.body.touching.up && globo.body.touching.down) { //Con el body lo que hago es que cuando la parte del globo de abajo toca la parte del cuerpo de las plataformas, entra en el if
                this.globo.disableBody(true, true);
                this.globo.enableBody(true, 200, 300, true, true);
                console.log("HAS PERDIDO!!!!");
            }
        }); //Colisiones entre el globo y el suelo. Si el globo toca el suelo, se vuelve a lanzar el globo.


        this.physics.add.collider(
            player,
            this.globo.getBola(),
            function (_player, globo)
            {
                if (_player.body.touching.up && globo.body.touching.down)
                {
                    globo.setVelocity(_player.body.velocity.x,-200);
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
        //ball
    }
}
export { Level1 };