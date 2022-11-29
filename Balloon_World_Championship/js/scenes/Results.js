
// Teclas especiales implementadas en esta escena
var keyEnter;
var keyP;

export class Results extends Phaser.Scene{

    constructor(){
        super({key:'results'});
    }

    preload(){
        this.load.image('background', 'assets/images/background/Fondo.png');
        this.load.image('podio', 'assets/images/sprites/PODIO.png');
        this.load.image('Victory', 'assets/images/UI/Titles/VICTORY.png');
        this.load.image('Continue', 'assets/images/UI/Buttons/BUTTON_CONTINUE.png');
        this.load.image('Exit', 'assets/images/UI/Buttons/BUTTON_EXIT.png');

        this.load.audio('error_theme', [
            'assets/music/results/error_sound.ogg',
            'assets/music/results/error_sound.mp3'
        ]);
    }

    create(){
        this.add.image(640, 416, 'background');
        this.add.image(600, 725, 'podio');
        this.add.image(640, 100, 'Victory');
        this.add.image(350, 300, 'Continue');
        this.add.image(900, 300, 'Exit');

        this.text = this.add.text(640, 200);

        //Añadir teclas especiales
        keyEnter=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyP=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        this.music = this.sound.add('error_theme');

        this.music.play();
    }

    update(){
        this.text.setText('PNF - 404. No se han encontrado jugadores. No hay registros o han empatado');

        // Evento si la tecla ENTER es pulsada
        if (keyEnter.isDown)
        {
            this.scene.start("Level1");
            this.music.stop();
        }

        // Evento si la tecla P es pulsada
        if (keyP.isDown)
        {
            this.scene.start("mainMenu");
            this.music.stop();
        }
        }
}