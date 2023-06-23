// Teclas especiales implementadas en esta escena
var sc;
export var usuarioLogin;

export class Login extends Phaser.Scene{
    
    // Constructor
    constructor(){
        super({key:'login'});
        	
        
			//p.onclick = login();
    }
    // Gestor de escenas  REFERENCIAS: https://www.youtube.com/watch?v=OBi8UHCcEW8&t=1137s
    preload(){
			
        this.load.image('Fondo', 'assets/images/background/Fondo.png');
        this.load.image('Ingresar', 'assets/images/UI/Titles/LOGIN.png');

    }
    create(){
        // Añadir imágenes
        this.add.image(480, 312, 'Fondo');
        this.add.image(480, 100, 'Ingresar');
        $('#chatWrapper').hide(0);

        
        //Añadir teclas especiales
     	 sc = this.scene;

     	 $('#boton').click(function(){
			  if(usuarioLogin != "")
			  {
				sc.start("start");	
			  	$('#cp').hide(0);
    
			  }	

		});
    }
     
}

function createUser(user) {
	
    $.ajax({
		
        method: "POST",
        url: 'http://'+location.host+'/users',
        data: JSON.stringify(user),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (user,status) {
        console.log("User created: " + JSON.stringify(user));   
        usuarioLogin = user;
        //console.log(user);  
        //console.log(user,status);  
    })

}

//Load items from server
 function loadUsers() {
    $.ajax({
        method: 'GET',
        url: 'http://'+location.host+'/users'
    }).done(function (items) {
        //console.log('Users loaded: ' + JSON.stringify(items));   
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



    $("#boton").click(function () {

        var value = input.val(); 
        usuarioLogin = value;       
        input.val('');
    	
        var user = {
            user: value,
            score: 0
            
        }
        if (user.user != "")
        {
			createUser(user); 
		}
        
    })
})