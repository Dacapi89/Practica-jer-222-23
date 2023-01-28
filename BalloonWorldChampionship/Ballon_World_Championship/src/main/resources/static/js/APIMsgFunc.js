	let identificadorIntervaloDeTiempo;
	var j = 0;
	var arrayM;
	//var chat = document.getElementById("chat");
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
		method: 'GET',
        url: 'http://'+location.host+'/messages'
    }).done(function (messages) {
		
        console.log(JSON.stringify(messages));
		callback(messages);
		  //for (var i = 0 ; i < messages.length; i++) {
					   
            //showExtMSG(chat,messages[i]); 
              //arrayM = JSON.stringify(messages);    
    //}

    })
}

function showExtMSG(chat, msg){
	chat.append('<span style="color:  #FF0000">' +msg.content+'</span><br>');
	console.log("ensenando");
}
function showIntMSG(chat, msg){
	chat.append('<span style="color: #89CFF0">' +msg.content+'</span><br>')
}

$(document).ready(function () {
	
	setInterval(	loadMSGs(function(messages){
		 console.log("llamada");
	for (var i = 0; i < messages.length; i++) {
            showExtMSG(chat,messages[i]);          
    }
	}),2000);
	window.onclose = function(){
		var message = {
			content : "oh vaya! ya no puedo leerte!"
		};
		postMSG(message,function(ans){
			showIntMSG(chat,ans) ;
		})
	}
	window.onbeforeunload = function(){
		var message = {
			content : "oh vaya! ya no puedo leerte!"
		};
		postMSG(message,function(ans){
			showIntMSG(chat,ans) ;
		})
	}

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