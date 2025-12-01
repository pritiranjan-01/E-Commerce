const ul = document.querySelector("#ul");
const arrr = ["Home", "About", "Services", "Contact", "Product"];
arrr.map((ele) => {
  const li = document.createElement("li");
  li.innerText = ele;
  ul.appendChild(li);
});

const closeBtn = document.querySelectorAll(".close-btn");
const loginbtn = document.querySelector("#login-btn");
const loginform = document.querySelector(".loginform");
const registerbtn = document.querySelector(".register-page");
const RegistrationForm = document.querySelector(".registerform");
const overlay=document.querySelector("#overlay");

closeBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    clearLoginInputs() 
    loginform.style.display = "none";
    RegistrationForm.style.display = "none";
    overlay.style.display="none"
  });
});

loginbtn.addEventListener("click", () => {
  clearLoginInputs() 
  loginform.style.display = "block";  
  RegistrationForm.style.display = "none";
  overlay.style.display="block"
});

registerbtn.addEventListener("click", () => {
  clearRegistrationInputs() 
  RegistrationForm.style.display = "block";
  loginform.style.display = "none";
  overlay.style.display="block"
});

const showLogin = document.querySelector(".login-page");

showLogin.addEventListener("click", () => {
  loginform.style.display = "block";
  RegistrationForm.style.display = "none";
});

document.querySelector("#sendOTP").addEventListener("click", generateOTP);

//  Parentheses are not used in generateOTP function for calling because
//  if used, the function will be called immediately when javascript
//  is loads which results undefined. and  here the reference is passed so
//  that when the button will clicked then only call the method.

let otp = undefined;
function generateOTP() {
  otp = Number(Math.round(Math.random() * 100000));
  // alert(`Your OTP is : ${otp}`);
  enteredOtp.value = otp;
}

function validateOTP(){
  if(otp===Number(enteredOtp.value))
    return true
  else
    alert("Invalid OTP")
  return false
}

function validateLoginData(){
    if(email.value=="" ){
      alert("Email is required")
      return;
    }
    if(password.value=="" ){
      alert("Password is required")
      return;
    }
    if(enteredOtp.value=="" ){
      alert("OTP is required")
      return;
    }
    return true;
}

// Login Logic
const login = document.querySelector(".login");
const email = document.querySelector("#email1");
const password = document.querySelector("#login-password1");
const enteredOtp = document.querySelector("#otp");

login.addEventListener("click", (e) => {
  e.preventDefault();
  if(validateLoginData() && validateOTP()){
//find will return the user which found while iterating.
   const chekUser = database.find((user)=>
          user.email==email.value && user.password==password.value
    )
  if (chekUser) {
    localStorage.setItem("currentuser", JSON.stringify(chekUser));
    window.location.href= "./pages/dashboard.html"
  }else{
    alert("Invalid Credential")
   }
  }
})


//Registration Logic
const fname=document.getElementById("fname")
const lname=document.getElementById("lname")
const registerEmail=document.getElementById("email")
const registerPassword=document.getElementById("password")
const confirmPassword=document.getElementById("cpassword")
const registerBtn= document.getElementById("register")

const database = JSON.parse(localStorage.getItem("Userdatabase")) || []
// console.log(database);

function validateData(){
    if(fname.value==""){
      alert("Please enter First Name")
      return
    }
    if(lname.value==""){
      alert("Please enter Last Name")
      return
    }
    if(registerEmail.value==""){
      alert("Please enter Email")
      return
    }
    if(registerPassword.value==""){
      alert("Please enter Password")
      return
    }
    if(confirmPassword.value==""){
      alert("Please enter First Name")
      return 
    }
    if(confirmPassword.value != registerPassword.value){
      alert("Confirm Password did't match with Password")
      return
    }
    return true;
}

registerBtn.addEventListener("click",(e)=>{
  e.preventDefault();
  if(validateData()){
    const data={
        firstName: fname.value,
        lastname: lname.value,
        email: registerEmail.value,
        password: confirmPassword.value,
        imgURL: "https://www.pngarts.com/files/10/Default-Profile-Picture-PNG-Free-Download.png"
      }
    database.push(data)
    localStorage.setItem("Userdatabase", JSON.stringify(database))
    alert("Registration Successful!");
    clearRegistrationInputs()
    loginform.style.display = "block";  
    RegistrationForm.style.display = "none";
    overlay.style.display="block";
  }
})

function clearLoginInputs() {
  email.value = "";
  password.value = "";
  enteredOtp.value = "";
}
function clearRegistrationInputs(){
  fname.value="";
  lname.value="";
  registerEmail.value;
  registerPassword.value;
  confirmPassword.value;
}

const navlinks=document.querySelector(".right")
const bar=document.querySelector(".bar i");
console.log(bar);
bar.addEventListener("click",()=>{
  navlinks.classList.toggle("show-nav")
})