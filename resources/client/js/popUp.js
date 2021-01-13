async function regUser(){ // takes user details to be put into the database

    Swal.fire({ // popup box with 2 input boxes for the sign up
        title: 'Registration Form',
        html: `<input type="text" id="regusername" class="swal2-input" placeholder="Username">
        <input type="password" id="regpassword" class="swal2-input" placeholder="Password">`,
        confirmButtonText: 'Sign Up',
        focusConfirm: false,
        preConfirm: () => {
            const login = Swal.getPopup().querySelector('#regusername').value
            const password = Swal.getPopup().querySelector('#regpassword').value
            if (!login || !password) { //validates input to see if either are enetered
              Swal.showValidationMessage(`Please enter login and password`)
            }
            return { regusername: login, regpassword: password }
    }
    }).then((result) => {

        console.log("Invoked postUserRegister() "); //uses new values  posts it too controller to add to database
        var tempUsrn = result.value.regusername;
        var tempPswd = result.value.regpassword;

        var url = "/user/register";
        var formData = new FormData();
        formData.append("username", tempUsrn);
        formData.append("password", tempPswd);

        fetch(url, {
           method: "POST",
           body: formData,
        }).then(response => {
           return response.json();                 //now return that promise to JSON
        }).then(response => {
           if (response.hasOwnProperty("Error")) { //  displays a message if there is an error
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: JSON.stringify(response),
                })
           } else {
               Swal.fire({ // displays a message if the account is made
                 position: 'top-end',
                 icon: 'success',
                 title: 'Account created and logged in!',
                 showConfirmButton: false,
                 timer: 1500
               });
           }
        });
    });
}

async function loginUser(){

    Swal.fire({ // gets login data from a popup box
        title: 'Login Form',
        html: `<input type="text" id="loginusername" class="swal2-input" placeholder="Username">
        <input type="password" id="loginpassword" class="swal2-input" placeholder="Password">`,
        confirmButtonText: 'Login',
        focusConfirm: false,
        preConfirm: () => {
        const login = Swal.getPopup().querySelector('#loginusername').value
        const password = Swal.getPopup().querySelector('#loginpassword').value
    if (!login || !password) { // validates if there is entry of password or username
      Swal.showValidationMessage(`Please enter login and password`)
    }
    return { loginusername: login, loginpassword: password } //returns username and password
    }
    }).then((result) => {

    console.log("Invoked postUserRegister() ");
    var tempUsrn = result.value.loginusername;
    var tempPswd = result.value.loginpassword;

    var url = "/user/login";
    var formData = new FormData();
    formData.append("username", tempUsrn);
    formData.append("password", tempPswd);
    // adds data into form data structure to be sent off to the controller
    fetch(url, {
        method: "POST",
        body: formData,
    }).then(response => {
        return response.json();                 //now return that promise to JSON
    }).then(response => {
        if (response.hasOwnProperty("Error")) {
            Cookies.set("token", response.token);
            Cookies.set("username", response.username);
            Swal.fire({ // creates an error message
                icon: 'error',
                title: 'Oops...',
                text: JSON.stringify(response),
            })
        } else {
            console.log("successful");
            Cookies.set("token", response.token);
            Cookies.set("username", response.username);
            Swal.fire({ // creates a success messages
                position: 'top-end',
                icon: 'success',
                title: 'Logged in!',
                showConfirmButton: false,
                timer: 1500
           });

       }

    });
    });
}

document.querySelector('.regBttn').addEventListener('click', function() { // actives reg when button is pressed
    regUser();
});

document.querySelector('.loginBttn').addEventListener('click', function() { // activates when login is pressed
    loginUser();
});



