function postMSG(msg, callback) {
    $.ajax({
        method: "POST",
        url: 'http://192.168.1.134:8090/messages',
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
        url: 'http://192.168.1.134:8090/messages/' + msg.id,
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
        url: 'http://192.168.1.134:8090/messages/' + msgId
    }).done(function (item) {
        console.log("Deleted message " + msgId)
    })
}
function loadMSGs(callback) {
    $.ajax({
        url: 'http://192.168.1.134:8090/messages'
    }).done(function (messages) {
        console.log('messages loaded: ' + JSON.stringify(messages));
        callback(messages);
    })
}
function showExtMSG(chat, msg){
	chat.append('<span style="color: #C21E56">' +msg.content+'</span><br>')
}
function showIntMSG(chat, msg){
	chat.append('<span style="color: #89CFF0">' +msg.content+'</span><br>')
}
$(document).ready(function () {
	
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
	loadMSGs(function(messages){
	for (var i = 0; i < messages.length; i++) {
            showExtMSG(chat,messages[i]);            
    }
	})
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