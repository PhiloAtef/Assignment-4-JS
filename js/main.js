let signupName = document.querySelector("#signupName");
let signupEmail = document.querySelector("#signupEmail");
let signupPassword = document.querySelector("#signupPassword");
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
let signinEmail = document.querySelector("#signinEmail");
let signinPassword = document.querySelector("#signinPassword");

let users = [];

let signUpArray = [];
if(localStorage.getItem("users") != null){
    signUpArray = JSON.parse(localStorage.getItem("users"));
}

displayUsers();

function displayUsers(){
    console.log(signUpArray)
}

function signUp(){
    if (isSignUpEmpty() == false) {
        document.querySelector('#exist').innerHTML = '<span class="text-danger m-3">Please enter all inputs</span>';
        return false;
    }

    let signUp = {
        name: signupName.value,
        email: signupEmail.value,
        pass: signupPassword.value,
    }

    if (ValidateEmail(signUp.email, emailRegex) == false) {
        document.querySelector('#exist').innerHTML = '<span class="text-danger m-3">enter proper email</span>';
        return false;
    }
    
   if (isDuplicateMail() == true) {
        document.querySelector('#exist').innerHTML = '<span class="text-danger m-3">email already exists</span>';
        return false;
   }else{
        signUpArray.push(signUp);
        localStorage.setItem('users', JSON.stringify(signUpArray));
        document.querySelector('#exist').innerHTML = '<span class="text-success m-3">success</span>';
   }
   
}

function isSignUpEmpty(){
    if (signupName.value == "" || signupEmail.value == "" || signupPassword.value == "") {
        return false;
    }else{
        return true;
    }
}

function isDuplicateMail(){
    for (let i = 0; i < signUpArray.length; i++) {
        
        if (signUpArray[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
            return true;
        }
    }
    return false;
}

function ValidateEmail(input, regex){
    return regex.test(input);
}

function login(){
    if (isLoginEmpty == true) {
        document.querySelector('#incorrect').innerHTML = '<span class="text-danger m-3">Please enter all required fields</span>';
        return false;
    }
    let pass = signinPassword.value;
    let email = signinEmail.value;
    for (let i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() == email.toLowerCase() && signUpArray[i].pass.toLowerCase() == pass.toLowerCase()) {
            localStorage.setItem('username', signUpArray[i].name);
            console.log("success")
            window.location.href="./home.html"
        }
        else{
            /* console.log(signUpArray[i].email,email,signUpArray[i].pass,pass) */
            document.querySelector('#incorrect').innerHTML = '<span class="text-danger m-3">wrong email and/or password</span>';
        }
        
    }
}

function isLoginEmpty(){
    if (signinEmail.value == "" || signinPassword.value == "") {
        return true;
    }else{
        return false;
    }
}

function logout() {
    localStorage.removeItem('username');
}

let sessionname = localStorage.getItem('username');
if (sessionname != null) {
    document.querySelector('#username').innerHTML = `<span class="text-primary m-3">Welcome ${sessionname}</span>`
}