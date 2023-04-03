
// Teclas especiales implementadas en esta escena
var local;
var online;
var back;
var connection;
export class Seleccion extends Phaser.Scene{

    constructor(){
        super({key:'selec'});
    }

    preload(){
        this.load.image('background', 'assets/images/background/Fondo.png');
        this.load.image('BotonLocal', 'assets/images/UI/Buttons/BUTTON_LOCAL.png');
        this.load.image('BotonOnline', 'assets/images/UI/Buttons/BUTTON_ONLINE.png');
        this.load.image('Return', 'assets/images/UI/Buttons/BUTTON_RETURN.png');

        this.load.audio('menu_theme', [ //Añadimos música al juego REFERENCIA: https://phaser.io/examples/v2/audio/play-music
            'assets/music/title/title_music.ogg',  // Música utilizada para la partida: https://www.youtube.com/watch?v=QG6STlj-d7w
            'assets/music/title/title_music.mp3'
        ]);
    }

    create(){

        // Añadir imágenes
        this.add.image(480, 312, 'background');
        local = this.add.image(700, 280, 'BotonLocal');
        online = this.add.image(250, 280, 'BotonOnline');
        back = this.add.image(30, 30, 'Return').setScale(0.5);

        local.setInteractive();
        online.setInteractive();
        back.setInteractive();

        this.music = this.sound.add('menu_theme');
        this.sound.stopAll();
        this.music.play();
        this.music.loop = true;
        
        local.on("pointerdown", ()=>{
			this.scene.start("level1");
		})
		
		online.on("pointerdown", ()=>{
			this.scene.start("waitRoom");
		})
		
		back.on("pointerdown", ()=>{
			this.scene.start("mainMenu");
		})
    }

}