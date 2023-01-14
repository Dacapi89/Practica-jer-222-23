// Teclas especiales implementadas en esta escena
var keyEnter;
export function loginM() {
 //escena.start("start");
	alert("CULO");
}
var p;
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
		p = document.getElementById("boton");
        // Añadir imágenes
        this.add.image(480, 312, 'Fondo');
        //Añadir teclas especiales
        keyEnter=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
     	 p.addEventListener("click", console.log("hola"));
    }

    update(){
		 
    $("#boton").click(function () {

    })
			

			//if(p.onclick)
			
        // Evento si la tecla ENTER es pulsada
        if (keyEnter.isDown)
		{
			this.scene.start("start");
		}

    }
     
			login() {
		
		p.onclick = this.scene.start("start");
        console.log("Entrando en Login");
        this.scene.start("start");

}
}

function createUser(user) {
	
    $.ajax({
		
        method: "POST",
        url: 'http://192.168.68.106:8090/users',
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
        url: 'http://192.168.68.106:8090/users/' + userId
    }).done(function (item) {
        console.log("Deleted user " + userId)
    })
}
//Load items from server
 function loadUsers() {
    $.ajax({
        method: 'GET',
        url: 'http://192.168.68.106:8090/users'
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

    //Handle items checkboxs
    // info.change(function (event) {

    //     //Get page elements for item
    //     var checkbox = $(event.target);
    //     var itemDiv = checkbox.parent();
    //     var textSpan = itemDiv.find('span');

    //     //Read item info from elements
    //     var itemDescription = textSpan.text();
    //     var itemChecked = checkbox.prop('checked');
    //     var itemId = itemDiv.attr('id').split('-')[1];

    //     //Create updated item
    //     var updatedItem = {
    //         id: itemId,
    //         description: itemDescription,
    //         checked: itemChecked
    //     }

    //     //Update item in server
    //     updateItem(updatedItem);

    //     //Update page when checked
    //     var style = itemChecked ? 'line-through' : 'none';
    //     textSpan.css('text-decoration', style);

    // })

    //Handle add button

    $("#boton").click(function () {

        var value = input.val();
        input.val('');
    
        var user = {
            user: value
            
        }
    
        createUser(user) 
        //this.scene.start("start")//, function (itemWithId) {
            //When item with id is returned from server
            //showItem(itemWithId);
        //});
    })
})