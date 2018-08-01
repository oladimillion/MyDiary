class Login extends Request{

  constructor(){
    super();
    this.btnSignin = document.getElementById("btn-signin");
    this.isLoading = false;
  }

  submit(form){
    const formData = new FormData(form);

    const errors = ValidateInput(formData);

    if(Object.keys(errors).length || this.isLoading){
      console.log(errors)
      return;
    }

    let body = {};

    Array.from(formData).forEach(([label, value]) => {
      body = {...body, [label]: value};
    })

    this.isLoading = true;
    this.updateSigninBtn();

    this.post("auth/login", body)
      .then(res => res.json())
      .then(this.onSuccess.bind(this))
      .catch(this.onError.bind(this));    
  }

  updateSigninBtn(){
    if(!this.isLoading){
      this.btnSignin.innerHTML = "Sign In";
    } else {
      this.btnSignin.innerHTML = 
        '<i class="fa fa-spinner fa-spin"></i>';
    }
  }

  onSuccess(data){
    this.isLoading = false;
    this.updateSigninBtn();
    const {token, user} = data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = "entries.html";
  }

  onError(error){
    console.log(error);
    this.isLoading = false;
    this.updateSigninBtn();
  }

}


const login = new Login();

document.getElementById("form")
  .addEventListener("submit", (e) => {
    e.preventDefault();

    login.submit(e.target)
  });

