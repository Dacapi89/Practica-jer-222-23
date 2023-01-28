
// Teclas especiales implementadas en esta escena
var keyO;
var keyEnter;
var keyP;

export class MainMenu extends Phaser.Scene{

    constructor(){
        super({key:'mainMenu'});
    }

    preload(){
        this.load.image('background', 'assets/images/background/Fondo.png');
        this.load.image('logoJuego', 'assets/images/UI/Logo_BWC.png');
        this.load.image('BotonPlay', 'assets/images/UI/Buttons/BUTTON_PLAY.png');
        this.load.image('credits', 'assets/images/UI/Buttons/BUTTON_CREDITS.png');
        this.load.image('deleteUser', 'assets/images/UI/Buttons/BUTTON_DELETE_USER.png');

        this.load.audio('menu_theme', [ //Añadimos música al juego REFERENCIA: https://phaser.io/examples/v2/audio/play-music
            'assets/music/title/title_music.ogg',  // Música utilizada para la partida: https://www.youtube.com/watch?v=QG6STlj-d7w
            'assets/music/title/title_music.mp3'
        ]);
    }

    create(){

        // Añadir imágenes
        this.add.image(480, 312, 'background');
        this.add.image(700, 330, 'logoJuego');
        this.add.image(250, 250, 'BotonPlay');
        this.add.image(250, 400, 'credits');
        this.add.image(100, 50, 'deleteUser');

        //Añadir teclas especiales
        keyO=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
        keyEnter=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyP=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        this.music = this.sound.add('menu_theme');
        this.sound.stopAll();
        this.music.play();
        this.music.loop = true;
    }

    update(){

        // Evento si la tecla ENTER es pulsada
        if (keyEnter.isDown)
		{
			this.scene.start("selec");
            this.music.stop();
		}
        else if (keyO.isDown){
            this.scene.start("credits");

        }
        else if (keyP.isDown){
			  //var b = document.getElementById("cp");
			  //b.style.display = "inline";
			  //b.style.position = "absolute";
			  //var b = document.getElementById("cp");
			  //b.remove();
			  //b.style.display = "none";

        //var elem = $(event.target);
        //if (elem.is('button')) {
            //var itemDiv = elem.parent();
            //var userId = itemDiv.attr('id').split('-')[1];
            //itemDiv.remove()

        //}

			  $('#cp').show(0);
            this.scene.start("login");
			deleteUser(1);
			console.log("Delete user en cliente...")

        }
    }
}
 function deleteUser(userId) {
    $.ajax({
        method: 'DELETE',
        url: 'http://'+location.host+'/users/' + userId
    }).done(function (item) {
        console.log("Deleted user " + userId)
    })
}