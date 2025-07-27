const form = document.querySelector(".inscription_content_form");
const login_form = document.getElementById("login_content_form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  inscription();
});
login_form.addEventListener("submit", function (e) {
  e.preventDefault();
  login();
});

function inscription() {
  const full_name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirm_password = document.getElementById("confirm_password").value;


  if (password !== confirm_password) {
    console.log("je suis dans le si");
    alert("Les mots de passes sont différents");
  } else {
    console.log("je suis dans le sinon");
    const user = {
      fullname: full_name,
      email: email,
      password: password,
    };
    localStorage.setItem("user", JSON.stringify(user));
    alert("Inscription réussi");
    console.log("Utilisateur enregistrer");
    window.location.href = "http://127.0.0.1:5500/login_in.html";
  }
}

function login() {
  const data = localStorage.getItem("user");
  const login_email = document.getElementById("login_email").value;
  const login_password = document.getElementById("login_password").value;
  const user = JSON.parse(data);
  console.log(login_password);
  if (login_email == user.email && login_password == user.password) {
    window.location.href = "http://127.0.0.1:5500/login.html";
  } else {
    alert("Votre email ou mot de passe est incorrect");
  }
}
