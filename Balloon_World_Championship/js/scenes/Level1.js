
function jump(object){

}
class Level1 extends Phaser.Scene{
    constructor(){
        super(Level1)
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
        //players (setCollideWorldBorder,setvelocity, keypress,anims, etc)
        //ball 
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