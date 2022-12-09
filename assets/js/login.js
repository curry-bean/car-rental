const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
});

//For sign in.
function signIn() {
    $('.spinner-grow').toggle();
    let email = document.getElementById('signin-username').value;
    let passwd = document.getElementById('signin-passwd').value;

    let data = {
        emailAddress: email,
        password: passwd
    }
    sanitise("login", data);
}

//For sign up.
function signUp() {
    $('.spinner-grow').toggle();
    let userName = document.getElementById('signup-name').value;
    let email = document.getElementById('signup-email').value;
    let passwd = document.getElementById('signup-passwd').value;

    let data = {
        name: userName,
        mail: email,
        passwd: passwd
    }
    console.log("dara", data)
    sanitise("signup", data);
}

function sanitise(operation, data) {

    if (operation == "login") {
        let email = data.emailAddress;
        let password = data.password;

        if (email == "") {
            emailError = "This field cannot be empty!";
            document.getElementById("errorEmail").innerHTML = emailError;
            document.getElementById("signin-username").style.backgroundColor = "pink";
            $('.spinner-grow').toggle();
            return;
        }
        if (password == "") {
            emailError = "This field cannot be empty!";
            document.getElementById("errorPass").innerHTML = emailError;
            document.getElementById("signin-passwd").style.backgroundColor = "pink";
            $('.spinner-grow').toggle();
            return;
        }
        signInFirebase(data);
    } else if (operation == "signup") {
        let name = data.name;
        let email = data.mail;
        let password = data.passwd;

        if (name === "") {
            nameError = "This field cannot be empty!";
            document.getElementById("errorText").innerHTML = nameError;
            document.getElementById("signup-name").style.backgroundColor = "pink";
            document.getElementById("signup-email").style.backgroundColor = "white";
            document.getElementById("signup-passwd").style.backgroundColor = "white";
            $('#errorText').show();
            $('#mailError').hide();
            $('#passError').hide();
            $('.spinner-grow').toggle();
            return;
        } else
        if (isNaN(name) === false) {
            nameError = "This field cannot be a number!";
            document.getElementById("errorText").innerHTML = nameError;
            document.getElementById("signup-name").style.backgroundColor = "pink";
            document.getElementById("signup-email").style.backgroundColor = "white";
            document.getElementById("signup-passwd").style.backgroundColor = "white";
            $('#errorText').show();
            $('#mailError').hide();
            $('#passError').hide();
            $('.spinner-grow').toggle();
            return;
        } else
        if (email == "") {
            emailError = "This field cannot be empty!";
            document.getElementById("mailError").innerHTML = emailError;
            document.getElementById("signup-email").style.backgroundColor = "pink";
            document.getElementById("signup-passwd").style.backgroundColor = "white";
            document.getElementById("signup-name").style.backgroundColor = "white";
            $('#errorText').hide();
            $('#mailError').show();
            $('#passError').hide();
            $('.spinner-grow').toggle();
            return;
        } else
        if (password == "") {
            passwordError = "This field cannot be empty!";
            document.getElementById("passError").innerHTML = passwordError;
            document.getElementById("signup-passwd").style.backgroundColor = "pink";
            document.getElementById("signup-email").style.backgroundColor = "white";
            document.getElementById("signup-name").style.backgroundColor = "white";
            $('#errorText').hide();
            $('#mailError').hide();
            $('#passError').show();
            $('.spinner-grow').toggle();
            return;
        } else if (password.length < 8) {
            passwordError = "Password is too short!";
            document.getElementById("passError").innerHTML = passwordError;
            document.getElementById("signup-passwd").style.backgroundColor = "grey";
            document.getElementById("signup-email").style.backgroundColor = "white";
            document.getElementById("signup-name").style.backgroundColor = "white";
            $('#errorText').hide();
            $('#mailError').hide();
            $('#passError').show();
            $('.spinner-grow').toggle();
            return;
        }
        signUpFirebase(data, calledLater);
    }

    console.log("Everything is good!");

    //If everything is good...
}


function signUpFirebase(data) {
    let name = data.name;
    let email = data.mail;
    let password = data.passwd;
    const database = firebase.database();
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch((err) => {
            document.getElementById("status2").innerHTML = err.message;
            $('.spinner-grow').toggle();
            $('#status2').toggle();

        })
        .then((dataPassed) => {
            verification();
            document.getElementById("status2").innerHTML = "Sign up success";
            let createdUser = dataPassed.user.uid;
            database.ref("users/" + createdUser).set({
                name: data.name
            });

        })

}

function signInFirebase(data) {
    let email = data.emailAddress;
    let password = data.password;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        $('.spinner-grow').toggle();
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        logStatus = "Incorrect email or password!";
        document.getElementById("status").innerHTML = logStatus;
        $('#errorPass').hide();
        $('#errorEmail').hide();
        $('#status').show();
        // ...
    });
}


window.onload = () => {
    checkStatus();
}

function checkStatus() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
           
            logStatus = "Successful login!";
            document.getElementById("status").innerHTML = logStatus;
            $('#status2').show();
           

            $('.spinner-grow').toggle();
            window.location.href = "index.html";

        } else {
          
            logStatus = "You are not logged in!";
            document.getElementById("status").innerHTML = logStatus;
        }
    });
}

function verification() {
    let user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function() {
        // Email sent.
        console.log("Email sent");
        logStatus2 = "We have sent you a verification email";
        document.getElementById("status2").innerHTML = logStatus2;
    }).catch(function(error) {
        // An error happened.
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    });
}

const calledLater = () => {
    console.log("This is called afterwards");
}