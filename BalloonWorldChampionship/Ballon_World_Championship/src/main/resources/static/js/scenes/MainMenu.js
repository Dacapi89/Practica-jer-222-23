
// Teclas especiales implementadas en esta escena
var jugar;
var creditos;
var controles;
var dUser;

import { usuarioLogin } from "./Login.js";
export class MainMenu extends Phaser.Scene{

    constructor(){
        super({key:'mainMenu'});
    }

    preload(){
        this.load.image('background', 'assets/images/background/Fondo.png');
        this.load.image('logoJuego', 'assets/images/UI/Logo_BWC.png');
        this.load.image('play', 'assets/images/UI/Buttons/BUTTON_PLAY.png');
        this.load.image('credits', 'assets/images/UI/Buttons/BUTTON_CREDITS.png');
        this.load.image('deleteUser', 'assets/images/UI/Buttons/BUTTON_DELETE_USER.png');
        this.load.image('controls', 'assets/images/UI/Buttons/BUTTON_CONTROLS.png');

        this.load.audio('menu_theme', [ //Añadimos música al juego REFERENCIA: https://phaser.io/examples/v2/audio/play-music
            'assets/music/title/title_music.ogg',  // Música utilizada para la partida: https://www.youtube.com/watch?v=QG6STlj-d7w
            'assets/music/title/title_music.mp3'
        ]);
    }

    create(){
        // Añadir imágenes
        this.add.image(480, 312, 'background');
        this.add.image(700, 330, 'logoJuego');
        jugar = this.add.image(250, 250, 'play');
        creditos = this.add.image(250, 400, 'credits');
        dUser = this.add.image(110, 50, 'deleteUser').setScale(0.5);
        controles = this.add.image(850, 50, 'controls').setScale(0.5);
        
		jugar.setInteractive();
		creditos.setInteractive();
		controles.setInteractive();
		
		jugar.on("pointerdown", ()=>{
			this.scene.start("selec");
		})
		
		creditos.on("pointerdown", ()=>{
			this.scene.start("credits");
		})
		
		controles.on("pointerdown", ()=>{
			this.scene.start("control");
		})

        this.music = this.sound.add('menu_theme');
        this.sound.stopAll();
        this.music.play();
        this.music.loop = true;
        
        //keyP=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        
        dUser.setInteractive();
        
        dUser.on("pointerdown", ()=>{
			$('#cp').show(0);
            this.scene.start("login");
			deleteUser(usuarioLogin.id);
			console.log("Delete user en cliente...")
		})
        
        
        //console.log(usuarioLogin);
        $('body').append('<div class="wrapper">		<div style="position: relative; left: 960px; top: 624px; height: 30px;"><div style=" bottom:0; margin: 0;  position: absolute; padding:2px;margin-bottom:35px; " id="chat"></div><button type="button" id="sendButton">Send</button><input type="text" id="message"/></div></div>')
$(document).ready(function () {
var sendBttn = $('#sendButton')
	var chat = $('#chat')
	sendBttn.click(function(){
		var message = {
			content : $("#message").val(),
			name : usuarioLogin.user
		};
		postMSG(message,function(ans){
			console.log("enviado")
		})
	})
	
})
}

    update(){

        // Evento si la tecla ENTER es pulsada
        /*if (keyP.isDown){
			  $('#cp').show(0);
            this.scene.start("login");
			deleteUser(usuarioLogin.id);
			console.log("Delete user en cliente...")

        }*/
        
        loadMSGs(function(messages){
		console.log("llamada");
		$('#chat').html("");
		for (var i = 0; i < messages.length; i++) {
            $('#chat').append(messages[i].name + ": " + messages[i].content + "<br>");       
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