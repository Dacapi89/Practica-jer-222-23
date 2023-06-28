
// Teclas especiales implementadas en esta escena
var jugar;
var creditos;
var controles;
var dUser;

import { usuarioLogin } from "./Login.js";
export class MainMenu extends Phaser.Scene{

    constructor(){
        super({key:'mainMenu'});
        this.segundos = 2;
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
		$('#chatWrapper').show(0);
        // Añadir imágenes
        this.add.image(480, 312, 'background');
        this.add.image(700, 330, 'logoJuego');
        jugar = this.add.image(250, 250, 'play');
        creditos = this.add.image(250, 400, 'credits');
        dUser = this.add.image(110, 50, 'deleteUser').setScale(0.5);
        controles = this.add.image(850, 50, 'controls').setScale(0.5);
        var message = 
			{
				name:"Server",
				content: "User " + usuarioLogin.user + " has connected."
			}
			postMSG(message,function(ans){
			console.log("enviado")
		})
		jugar.setInteractive();
		creditos.setInteractive();
		controles.setInteractive();
		
		jugar.on("pointerdown", ()=>{
			var message = 
			{
				name:"Server",
				content: "User " + usuarioLogin.user + " has disconnected."
			}
			postMSG(message,function(ans){
			console.log("enviado")
		})
			this.scene.start("selec");
			$('#chatWrapper').hide(0);
		})
		
		creditos.on("pointerdown", ()=>{
			this.scene.start("credits");
			$('#chatWrapper').hide(0);
		})
		
		controles.on("pointerdown", ()=>{
			this.scene.start("control");
			$('#chatWrapper').hide(0);
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
            $('#chatWrapper').hide(0);
			deleteUser(usuarioLogin.id);
			console.log("Delete user en cliente...")
			//this.time.removeAllEvents()
			var message = 
			{
				name:"Sistema",
				content: "El usuario " + usuarioLogin.user + " se ha desconectado."
			}
			postMSG(message,function(ans){
			console.log("enviado")
		})
		})
        $(document)
        
        //console.log(usuarioLogin);
	
        this.time.addEvent({  //Cada segundo llama a la función actualizarTiempo REFERENCIAS: https://www.youtube.com/watch?v=2esow22Z0fc
            delay: 1000,
            loop: true,
            callback: () => {
                this.actualizarChat()
            }
        })
        window.addEventListener("beforeunload", function (e) {

      ejecutar();

      (e || window.event).returnValue = null;

      return null;

    });

    function ejecutar() {
		deleteUser(usuarioLogin.id);
		var message = 
			{
				name:"Sistema",
				content: "El usuario " + usuarioLogin.user + " se ha desconectado."
			}
			postMSG(message,function(ans){
			console.log("enviado")
		})
		}
}

    update(){
		
	 

        
        // Evento si la tecla ENTER es pulsada
        /*if (keyP.isDown){
			  $('#cp').show(0);
            this.scene.start("login");
			deleteUser(usuarioLogin.id);
			console.log("Delete user en cliente...")

        }*/
        
        

    }
    actualizarChat() {

        if(this.segundos == 0) {
                    loadMSGs(function(messages){
		console.log("llamada");
		$('#chat').html("");
		for (var i = 0; i < messages.length; i++) {
            $('#chat').append(messages[i].name + ": " + messages[i].content + "<br>");       
    	}
	})
		this.segundos = 2;
        }
        this.segundos--;
    }
}
 function deleteUser(userId) {
	// Poner feedback
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
	$('#sendButton').click(function(){
		var message = {
			content : $("#message").val(),
			name : usuarioLogin.user
		};
			postMSG(message,function(ans){
			console.log("enviado")
		})
		$("#message").val("");
	})
