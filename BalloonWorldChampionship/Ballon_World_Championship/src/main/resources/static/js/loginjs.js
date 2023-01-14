function login() {
    //var user;

    //user = document.getElementById("usuario").value;
    
		
       // window.location = "index2.html";
       console.log("PENE");

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
    
        createUser(user) //, function (itemWithId) {
            //When item with id is returned from server
            //showItem(itemWithId);
        //});
    })
})