const User = {
  initRegisterData: () => {
    let registerData = JSON.parse(localStorage.getItem("users"))
    if(!registerData){
      localStorage.setItem("users", JSON.stringify([]))
    }
    return JSON.parse(localStorage.getItem("users"))
  },
  inscription: () => {
    const registerForm = document.getElementById("formulaire_inscription")
    if(registerForm){
      registerForm.addEventListener('submit', e=>{
        e.preventDefault()
        const nameValue = document.getElementById("name").value
        const emailValue = document.getElementById("email").value
        const passwordValue = document.getElementById("password").value
        const confirmPasswordValue= document.getElementById("confirm_password").value

        //==> check if all field are not empty
        if(nameValue === "" || emailValue === "" || passwordValue === "" || confirmPasswordValue === ""){
          alert("Veuillez remplir tous les champs.")
          return
        }

        //==> check if email is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!emailRegex.test(emailValue)){
          alert("Veuillez entrer une adresse email valide.")
          return
        }

        //==> check if passwords match
        if(passwordValue !== confirmPasswordValue){
          alert("Les mots de passe ne correspondent pas.")
          return
        }

        const users = User.initRegisterData()
        const userExists = users.some(user => user.email === emailValue)
        if(userExists){
          alert("Cet email est déjà utilisé.")
          return
        }

        //==> create new user object
        const newUser = {
          name: nameValue,
          email: emailValue,
          password: passwordValue
        }

        //==> add new user to localStorage
        users.push(newUser)
        localStorage.setItem("users", JSON.stringify(users))
        alert("Inscription réussie !")

        setTimeout(() => {
          window.location.href = "login_in.html"
        }, 300)


      })
    }
  },
}
User.inscription()