import { Bola} from './Bola.js';

//Configuracion de la ventana
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
//Variables globales
var player;
var platforms;
var cursors;
var bolas; 
var globo;

//Empieza el game con phaser
var game = new Phaser.Game(config);

function preload()
{
    globo = new Bola(this, player);
    globo.preload();
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    //globo.preload();
}
function create()
{
    this.add.image(400, 300, 'sky');

    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    player = this.physics.add.sprite(100, 450, 'dude');

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);


    

    //Animaciones
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
    //Creamos una variable para las entradas de teclado
    cursors = this.input.keyboard.createCursorKeys();
    //Creamos el globo
    globo.create();
    
    //COLISIONES

    this.physics.add.collider(player, platforms); //Colisiones entre el jugador y las plataformas.

    this.physics.add.collider(globo.getBola(), platforms, function (globo, suelo) {
        if(suelo.body.touching.up && globo.body.touching.down) {
            globo.disableBody(true, true);
            globo.enableBody(true, 200, 300, true, true);
            console.log("HAS PERDIDO!!!!");
        }
    }); //Colisiones entre el globo y el suelo. Si el globo toca el suelo, se vuelve a lanzar el globo.

    this.physics.add.collider(
        player,
        globo.getBola(),
        function (_player, globo)
        {
            if (_player.body.touching.up && globo.body.touching.down)
            {
                globo.setVelocity(_player.body.velocity.x,-200);
            }
        }); //Colision con el player en función de su velocidad REFERENCIA: https://phaser.io/examples/v3/view/physics/arcade/collision-direction#

}
function update()
{
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else
    { //Si no se pulsa una tecla, se activa la animación de turn
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) //El salto solo si está en el suelo y la tecla pulsada
    {
        player.setVelocityY(-320);
    }
   
}
