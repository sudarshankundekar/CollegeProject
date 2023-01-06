//alert(1);
let signInbtn = document.getElementById("sign-in-btn");
let signUnbtn = document.getElementById("sign-up-btn");

let FullName = document.getElementById("Full-Name");
let signUpEmail = document.getElementById("signup-email");
let signUpPassword = document.getElementById("signup-password");

let PasswordMatch = "^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$";
let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


const ValidationForm = document.getElementById("ValidationForm");




//signupValidation
function signupValidation() {
  if (FullName.value == "") {
    alert("Please Fill the First Name");
  } else if (!signUpEmail.value.match(validRegex)) {
    alert("Please Enter Valid Email ID");
  } else if (signUpPassword.value == "") {
    alert("Please Enter Password");
  } else if (signUpPassword.value.length <= 8) {
    alert("password should be contain 8 characters");
  } else if (signUpPassword.value.match(PasswordMatch)) {
    alert("please Enter Valid Password");
  }
  else {
    SignUpLocalStorage();
    ValidationForm.reset();

  }
}


//signupSucessFully
function signupSucessFully(SucessFully) {
  confirm(`Now You SignUp Succesfully
   Do You Want a Sign In`);
  window.location.href = "login.html"
}

if (signUnbtn) {
  signUnbtn.addEventListener("click", function (e) {
    e.preventDefault();
    signupValidation();
  });
}

//localstorage SignUp
function SignUpLocalStorage() {
  const fnameValue = document.getElementById("Full-Name").value;
  const emailValue = document.getElementById("signup-email").value;
  const passwordValue = document.getElementById("signup-password").value;
  console.log(fnameValue);

  let formData = new Array();

  formData = JSON.parse(localStorage.getItem("users")) || [];

  if (formData.some(v => v.email == emailValue )) {
    alert("Email is already exist, please enter unique id");
  }
  else {

    formData.push(
      {
        "fanme": fnameValue,
        "email": emailValue,
        "Password": passwordValue

      });

    localStorage.setItem('users', JSON.stringify(formData));
    signupSucessFully();
  }
}





if(signInbtn){
  signInbtn.addEventListener("click", function(e){
    e.preventDefault();
    SignInForm();
  });
}


function SignInForm(){

  let loginEmail = document.getElementById("loginEmail").value;
  let loginPswd  = document.getElementById("loginPassword").value;
  console.log(loginEmail);
  console.log(loginPswd);



  let user_data = JSON.parse(localStorage.getItem("users")) || [];

  console.log(user_data );

  if(user_data.some( v => v.email == loginEmail &&  v.Password == loginPswd ))
  {
    window.location.href = "student-form.html";
  }
  else{
    alert("Please enter valid credential");   
  }
}



const logout = document.getElementById("signOut");

logout.addEventListener("click", function(e){
  e.preventDefault();
  window.location.href ="login.html";

});


const saveBtn = document.getElementById("saveForm");

if(saveBtn){
  saveBtn.addEventListener('click', function(e){
    e.preventDefault();
    saveForm();
  })
}

function saveForm(){

   let allInput = [];

   allInput = document.forms["student-form"].querySelectorAll("input,input[type='radio'],select,textarea");
   

   for(let i=0; i<=allInput.length  ; i++){
    
        let inputField = allInput[i];
        let inputFieldValue = inputField.value;
        const errorTag = document.createElement("p");
        errorTag.className = "error-msg"
        let inputParent = inputField.parentElement;
         

        if(inputFieldValue.length == 0  ){
          let selectedLabel = inputField.previousElementSibling.innerText;
          const errorContent = document.createTextNode("Please enter "+ selectedLabel);
          errorTag.appendChild(errorContent);
          inputParent.appendChild(errorTag);
          //alert("input");
        }
        else if( inputField.type == "radio" && inputField.checked == false ){
          const errorContent = document.createTextNode("Please select gender");
          errorTag.appendChild(errorContent);
          inputParent.appendChild(errorTag);
      }
       
  }

  if(inputFieldValue.length !== 0){
    for(let i=0; i<=allInput.length  ; i++){
      const hideError = document.getElementsByClassName('error-msg');
      hideError[i].style.display = "none";
    }
  }
}
