
/**
 * This variable stores the logged in user
 */
var loggedUser = {};

/**
 * This function is called when login button is pressed.
 * Note that this does not perform an actual authentication of the user.
 * A student is loaded given the specified email,
 * if it exists, the studentId is used in future calls.
 */
function login()
{
    //get the form object
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    fetch('../api/v1/authentications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { email: email, password: password } ),
    })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) { // Here you get the data to modify as you please
        //console.log(data);
        localStorage.setItem('token', data.token);
        loggedUser.token = data.token;
        loggedUser.email = data.email;
        loggedUser.id = data.id;
        loggedUser.self = data.self;
        loggedUser.id = loggedUser.self.substring(loggedUser.self.lastIndexOf('/') + 1);
        document.getElementById("loggedUser").textContent = loggedUser.id;
        return;
    })
    .catch( error => console.error(error) ); // If there is any error you will catch them here

};

function logout() {
    // Check if loggedUser is defined
    if (typeof loggedUser.self !== 'undefined') {
        loggedUser.token = undefined;
        loggedUser.email = undefined;
        loggedUser.id = undefined;
        loggedUser.self = undefined;
        document.getElementById("loggedUser").textContent = '';
        console.log('User has been logged out');
    } else {
        console.error('There is not a logged user');
        return;
    }
}

function rstPwd(button) {
    //console.log('started resetPassword');
    button.disabled = true;
    var urlParams = new URLSearchParams(window.location.search);
    var password = document.getElementById("password").value;
    var token = urlParams.get('token');
    var userId = urlParams.get('id');
    //console.log('userId: ' + userId);
    //console.log('token: ' + token);
    try{
        fetch('/api/v1/authentications/passwordReset', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( { userId: userId, token: token, password: password } ),
        })
        .then((resp) => resp.json())
        .then(function(data) {
            alert("La password è stata modificata con successo");
            
        })
    } catch (error) {
        button.disabled = false;
        console.error(error);
        return;
    }
}


