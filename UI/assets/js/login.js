class Login extends Request{

  constructor(){
    super();
    this.status = new Status();
    this.btnSignin = document.getElementById("btn-signin");
    this.isLoading = false;
  }

  submit(form){
    const formData = new FormData(form);

    const errors = ValidateInput(formData);

    if(Object.keys(errors).length || this.isLoading){
      this.status.show({errors}, true);
      return;
    }

    let body = {};

    if(this.isLoading){
      return;
    }

    Array.from(formData).forEach(([label, value]) => {
      body = {...body, [label]: value};
    })

    this.isLoading = true;
    this.updateSigninBtn();

    this.post("auth/login", body)
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
    setTimeout(() => {
      window.location.href = "entries.html";
    }, 1000);
    this.status.show(data);
  }

  onError(error){
    this.isLoading = false;
    this.updateSigninBtn();
    this.status.show(error, true);
  }

}


const login = new Login();

document.getElementById("form")
  .addEventListener("submit", (e) => {
    e.preventDefault();

    login.submit(e.target)
  });

