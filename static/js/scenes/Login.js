// Teclas especiales implementadas en esta escena
var sc;
export class Login extends Phaser.Scene{
    
    // Constructor
    constructor(){
        super({key:'login'});
        	
        
			//p.onclick = login();
    }
    // Gestor de escenas  REFERENCIAS: https://www.youtube.com/watch?v=OBi8UHCcEW8&t=1137s
    preload(){
			
        this.load.image('Fondo', 'assets/images/background/Fondo.png');
    }
    create(){
        // Añadir imágenes
        this.add.image(480, 312, 'Fondo');
        //Añadir teclas especiales
     	 sc = this.scene;
     	 $('#boton').click(function(){
			  sc.start("start");
			  var b = document.getElementById("cp");
			  b.remove();
    
		});
    }

    update(){
		 

    }
     
}

function createUser(user) {
	
    $.ajax({
		
        method: "POST",
        url: 'http://192.168.1.134:8080/users',
        data: JSON.stringify(user),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (user) {
        console.log("User created: " + JSON.stringify(user));       
    })
}
 function deleteUser(userId) {
    $.ajax({
        method: 'DELETE',
        url: 'http://192.168.1.134:8080/users/' + userId
    }).done(function (item) {
        console.log("Deleted user " + userId)
    })
}
//Load items from server
 function loadUsers() {
    $.ajax({
        method: 'GET',
        url: 'http://192.168.1.134:8080/users'
    }).done(function (items) {
        console.log('Users loaded: ' + JSON.stringify(items));   
    })
}
 function showUser(item) {

    var checked = '';
    var style = '';

    if (item.checked) {
        checked = 'checked';
        style = 'style="text-decoration:line-through"';
    }

    $('#info').append(
        '<div id="item-' + item.id + '"><input type="checkbox" ' + checked + '><span ' + style + '>' + item.user +
        '</span> <button>Delete</button></div>')
}
$(document).ready(function () {

    loadUsers(function (items) {
        //When items are loaded from server
        for (var i = 0; i < items.length; i++) {
            showUser(items[i]);
        }
    });

    var input = $('#usuario')
    var info = $('#info')

    //Handle delete buttons
    info.click(function (event) {
        var elem = $(event.target);
        if (elem.is('button')) {
            var itemDiv = elem.parent();
            var userId = itemDiv.attr('id').split('-')[1];
            itemDiv.remove()
            deleteUser(userId);
        }
    })


    $("#boton").click(function () {

        var value = input.val();
        input.val('');
    
        var user = {
            user: value
            
        }
    
        createUser(user) 
    })
})