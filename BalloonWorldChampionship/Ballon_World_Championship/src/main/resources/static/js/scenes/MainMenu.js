
// Teclas especiales implementadas en esta escena
var keyO;
var keyEnter;
var keyP;
import { usuarioLogin } from "./Login.js";
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
        
        //console.log(usuarioLogin);
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
			  $('#cp').show(0);
            this.scene.start("login");
			deleteUser(usuarioLogin.id);
			console.log("Delete user en cliente...")

        }
        loadMSGs(function(messages){
		console.log("llamada");
		for (var i = 0; i < messages.length; i++) {
            showExtMSG(chat,messages[i]);          
    }
	})
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
function postMSG(msg, callback) {
    $.ajax({
        method: "POST",
        url: 'http://'+location.host+'/messages',
        data: JSON.stringify(msg),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (msg) {
        console.log("message created: " + JSON.stringify(msg));
        callback(msg);
    })
}
function updateMSG(msg) {
    $.ajax({
        method: 'PUT',
        url: 'http://'+location.host+'/messages' + msg.id,
        data: JSON.stringify(msg),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (msg) {
        console.log("Updated message: " + JSON.stringify(msg))
    })
}
function deleteMSG(msgId) {
    $.ajax({
        method: 'DELETE',
        url: 'http://'+location.host+'/messages' + msgId
    }).done(function (item) {
        console.log("Deleted message " + msgId)
    })
}
function loadMSGs(callback) {
    $.ajax({
        url: 'http://'+location.host+'/messages'
    }).done(function (messages) {
        console.log(JSON.stringify(messages));
		callback(messages);
    })
}
$(document).ready(function () {
var sendBttn = $('#sendButton')
	var chat = $('#chat')
	sendBttn.click(function(){
		var message = {
			content : $("#message").val()
		};
		postMSG(message,function(ans){
			showIntMSG(chat,ans) ;
		})
	})
	
})