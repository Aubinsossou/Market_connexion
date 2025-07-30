let User = {
  form: document.getElementById("formulaire_inscription"),
  login_form: document.getElementById("login_content_form"),
  input_password: document.getElementById("password"),
  message_error: document.querySelectorAll(".message_error"),
  login_message_error: document.querySelectorAll(".login_message_error"),
  icon_eye: document.querySelectorAll(".icon_eye"),
  logout_btn: document.getElementById("logout"),
  title_page_acceuil: document.getElementById("title_page_acceuil"),
  full_name: document.getElementById("name").value,
  email: document.getElementById("email").value,
  password: document.getElementById("password").value,
  confirm_password: document.getElementById("confirm_password").value,
  inscription: () => {
    //Remettre les messages d'erreur a un string vide

    if (User.message_error) {
      User.message_error.forEach((item) => {
        console.log("Name : "+document.getElementById("name").value)
        console.log("Ligne : "+ item);
        item.innerHTML = "";
      });
    }
    if (
      User.full_name == "" ||
      User.email == "" ||
      User.password == "" ||
      User.confirm_password == ""
    ) {
      console.log("User.full_name : " + User.full_name)
      if (User.full_name === "") {
        console.log("Je suis dans nom");
        User.message_error[0].style.display = "block";
        User.message_error[0].innerHTML =
          "Veuillez remplir le champ nom et prénom";
      }
      retun
      if (User.email == "") {
        console.log("Je suis dans email");
        User.message_error[1].style.display = "block";
        User.message_error[1].innerHTML = "Veuillez remplir le champ email";
      }
      if (User.password == "") {
        console.log("Je suis dans password");
        User.message_error[2].style.display = "block";
        User.message_error[2].innerHTML = "Veuillez remplir le champ password";
      }
    } else {
      if (User.password !== User.confirm_password) {
        console.log("je suis dans le cas ou le confirme password est different du password");
        alert("Les mots de passes sont différents");
      } else {
        console.log("je suis dans le sinon");
        const user = {
          fullname: User.full_name,
          email: User.email,
          password: User.password,
        };

        let users = [];
        let oldUsers = localStorage.getItem("users");
        if (oldUsers) {
          // users = [...JSON.parse(oldUsers)]
          users = JSON.parse(oldUsers);
        }
        const existed_email = users.filter((usr) => usr.email == User.email)[0];
        if (existed_email) {
          alert("Le mail existe déja");
          return;
        }

        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        alert("Inscription réussi");
        console.log("Utilisateur enregistrer");
        window.location.pathname = "/login_in.html";
      }
    }
  },
};

/* if(window.location.href = "http://127.0.0.1:5500/login.html"){
      if(localStorage.getItem("token")){
        window.location.href = "http://127.0.0.1:5500/login.html"
        return
      }
      else if(){
        window.location.href = "http://127.0.0.1:5500/login_in.html"
      return
      }
    } */

// Fonction pour l'inscricption

/* if (input_password) {
  function Verify_password() {
    input_password.addEventListener("input", (e) => {
      message_error[2].innerHTML = ""
      console.log(input_password.value);
      
      if(input_password.value.length <=4){
        message_error[2].style.display = "block";
      message_error[2].innerHTML = "Mot de passe trop court et peu sur";
      }
       if(input_password.value.length >4 && ){
        message_error[2].style.display = "block";
      message_error[2].innerHTML = "Mot de passe  peu sur ";
      }
    });
  }
}
Verify_password();
*/

function inscription() {}
const input = document.querySelectorAll(".eyeInput");

//Voir et cacher le mot de passe
/* if (icon_eye) {
  icon_eye.addEventListener("click", function () {
    input.type == "password"
      ? input.type = "text"
      : input.type = "password";
  });
} */
/* if (icon_eye) {
  icon_eye.forEach((icon) => {
    input.forEach((item) => {
      icon.addEventListener("click", (e) => {
        item.type == "password"
          ? (item.type = "text")
          : (item.type = "password");
      });
    });
  });
} */

// Function pour se connecter

function login() {
  const data = localStorage.getItem("users");
  const login_email = document.getElementById("login_email").value;
  const login_password = document.getElementById("login_password").value;
  const users = JSON.parse(data);
  console.log(users);

  login_message_error.forEach((item) => {
    item.innerHTML = "";
  });

  if (login_email == "" || login_password == "") {
    if (login_email == "") {
      login_message_error[0].style.display = "block";
      login_message_error[0].innerHTML = "Veuillez remplir le champ email";
    }
    if (login_password == "") {
      login_message_error[1].style.display = "block";
      login_message_error[1].innerHTML = "Veuillez remplir le champ password";
    }
  } else if (login_email !== "" || login_password !== "") {
    let existed_user = users.find((usr) => usr.email == login_email);
    if (existed_user && login_password == existed_user.password) {
      localStorage.setItem("token", "fake_token");
      window.location.href = "http://127.0.0.1:5500/login.html";
      console.log("Je suis sur ma page d'acceuil");
      if (title_page_acceuil) {
        title_page_acceuil.innerHTML = `Bienvenu Mr ${existed_user.full_name} Merci de vous êtes connecter`;
      }
    } else {
      alert("Votre email ou mot de passe est incorrect");
    }
  }
  console.log(localStorage.getItem("token"));
  console.log(login_password);
}

// Fonction se deconnecter
/* if (logout_btn) {
  logout_btn.addEventListener("click", function (e) {
    e.preventDefault();
    if (localStorage.getItem("token")) {
      //supprimer le token du navigateur
      localStorage.removeItem("token");
      window.location.href = "http://127.0.0.1:5500/login_in.html";
    }
  });
}
 */
/* function validateInscription() {
  const full_name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirm_password = document.getElementById("confirm_password").value;
}
 */

if (User.form) {
  User.form.addEventListener("submit", function (e) {
    e.preventDefault();
    //User.full_name = document.getElementById("name").value
    User.inscription();
  });
}
/* if (login_form) {
  login_form.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("je suis dans le login form");
    login();
  });
}
 */
const url = window.location.pathname;
const token = localStorage.getItem("token");

if (url == "/login.html" && !token) {
  window.location.href = "/login_in.html";
} else if (url == "/login_in.html" && token) {
  window.location.href = "/login.html";
}
