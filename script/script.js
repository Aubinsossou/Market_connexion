const User = {
  initRegisterData: () => {
    let registerData = JSON.parse(localStorage.getItem("users"));
    if (!registerData) {
      localStorage.setItem("users", JSON.stringify([]));
    }
    return JSON.parse(localStorage.getItem("users"));
  },
  inscription: () => {
    const registerForm = document.getElementById("formulaire_inscription");
    if (registerForm) {
      registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const nameValue = document.getElementById("name").value;
        const emailValue = document.getElementById("email").value;
        const passwordValue = document.getElementById("password").value;
        const confirmPasswordValue =
          document.getElementById("confirm_password").value;
        const message_error = document.querySelectorAll(".message_error");
        console.log(message_error);
        // Remettre a "" les messages d'erreur
        if (message_error) {
          message_error.forEach((item) => {
            item.innerHTML = "";
          });
        }

        //==> check if all field are not empty
        if (
          nameValue === "" ||
          emailValue === "" ||
          passwordValue === "" ||
          confirmPasswordValue === ""
        ) {
          if (nameValue === "") {
            if (message_error) {
              message_error[0].style.display = "block";
              message_error[0].innerHTML = "Veillez remplir le champ nom";
            }
          }

          if (emailValue === "") {
            if (message_error) {
              message_error[1].style.display = "block";
              message_error[1].innerHTML = "Veillez remplir le champ Email";
            }
          }
          if (passwordValue === "") {
            if (message_error) {
              message_error[2].style.display = "block";
              message_error[2].innerHTML =
                "Veillez remplir le champ du mot de passe";
              return;
            }
          }
        }

        //==> check if email is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailValue !== "") {
          if (!emailRegex.test(emailValue)) {
            alert("Veuillez entrer une adresse email valide.");
            return;
          }
        }

        //==> check if passwords match
        if (passwordValue !== confirmPasswordValue) {
          message_error[3].style.display = "block";
          message_error[3].innerHTML =
            "Les mots de passes ne correspondent pas";
          return;
        }

        const users = User.initRegisterData();
        const userExists = users.some((user) => user.email === emailValue);
        if (userExists) {
          alert("Cet email est déjà utilisé.");
          return;
        }

        //==> create new user object
        const newUser = {
          name: nameValue,
          email: emailValue,
          password: passwordValue,
        };

        //==> add new user to localStorage
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        alert("Inscription réussie !");

        setTimeout(() => {
          window.location.pathname = "/login_in.html";
        }, 300);
      });
    }
  },

  login: () => {
    const loginForm = document.getElementById("login_content_form");
    const login_message_error = document.querySelectorAll(
      ".login_message_error"
    );

    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const loginEmailValue = document.getElementById("login_email").value;
        const loginPasswordValue =
        document.getElementById("login_password").value;

        // Remettre a "" les messages d'erreur

        if (login_message_error) {
          login_message_error.forEach(item => item.innerHTML = "")

          if (loginEmailValue === "" || loginPasswordValue === "") {
            if (loginEmailValue === "") {
              login_message_error[0].style.display = "block";
              login_message_error[0].innerHTML = "Veillez remplir le champ email";
            }
            if (loginPasswordValue === "") {
              login_message_error[1].style.display = "block";
              login_message_error[1].innerHTML = "Veillez remplir le champ mot de passe";
            }
          }
          console.log("Je suis dans le cas ou les 2 input sont remplit");
          const users = User.initRegisterData();
          const userExists = users.find(
            (user) => user.email === loginEmailValue
          ); 
          console.log(loginEmailValue);
          console.log(userExists);
          if (userExists && userExists.password === loginPasswordValue) {
            const token = "fakeToken";
            localStorage.setItem("token", JSON.stringify(token));
            console.log("Connexion réussi");
            window.location.pathname = "/login.html";
          } else {
            alert("L'email ou le mot de passe est incorrect");
          }
        }
      });
    }
  },
  logout:()=>{
    const logout=document.getElementById("logout");
    if(logout){
      logout.addEventListener("click", (e)=>{
        e.preventDefault();
          localStorage.removeItem("token")
          window.location.href="/login_in.html"
          console.log("redirection")
      })
    }
  },
  verifyUrl:()=>{
    const token = localStorage.getItem("token")
    console.log(token);
    if(token){
      window.location.href="login.html"
    }else{
      window.location.href="login_in.html" 
    }
    /* if(window.location.href="/login.html" && !localStorage.getItem("token")){
      window.location.href="login_in.html" 
    }
    else if(window.location.href="/login.html" && localStorage.getItem("token"))
    {
      window.location.href="login.html"
    } */
  },
};
User.inscription();
User.login();
User.logout();
//export default User;

