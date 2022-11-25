
function jump(object){

}
class Level1 extends Phaser.Scene{
    constructor(){
        super(Level1)
    }
    preload()
    {   
        this.load.image("backgroundSky",'assets/images/background/sky.png');
        this.load.image("backgroundClouds",'assets/images/background/clouds.png');  
        this.load.image("backgroundAtmosphere",'assets/images/background/cloud_layer.png');  
        this.load.image("backgroundMountains",'assets/images/background/mountains.png');  
        this.load.image("backgroundStars",'assets/images/background/stars.png');        
    }
    create()
    {
        this.add.image(0,0,"backgroundSky").setOrigin(0,0).setScrollFactor(0,0).setScale(4)
        this.bg0=this.add.tileSprite(0,0,320,240,'backgroundAtmosphere').setOrigin(0,0).setScrollFactor(0,0).setScale(4)
        this.bg1=this.add.tileSprite(0,0,320,240,'backgroundMountains').setOrigin(0,0).setScrollFactor(0,0).setScale(4)
        this.bg2=this.add.tileSprite(0,0,320,240,'backgroundClouds').setOrigin(0,0).setScrollFactor(0,0).setScale(4)
        this.bg3=this.add.tileSprite(0,0,320,240,'backgroundStars').setOrigin(0,0).setScrollFactor(0,0).setScale(4)
        //this.scene.add(playerWASD)
    }
    update()
    {           
        this.bg3.tilePositionX-=0.05;
        this.bg2.tilePositionX-=0.2;
        this.bg1.tilePositionX-=0.5;
        this.bg0.tilePositionX-=0.7;
    }
}