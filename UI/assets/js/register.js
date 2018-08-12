class Register extends Request{

  constructor(){
    super();
    this.status = new Status();
    this.btnSignup = document.getElementById("btn-signup");
    this.isLoading = false;
  }

  submit(form){
    const formData = new FormData(form);

    const errors = ValidateInput(formData);

    if(formData.get("password") !== formData.get("cpassword")){
      Object.assign(errors, {error: "Passwords must match"});
    }

    if(Object.keys(errors).length || this.isLoading){
      this.status.show({errors}, true);
      return;
    }

    let body = {};

    if(this.isLoading){
      return;
    }

    Array.from(formData).forEach(([label, value]) => {
      if(label !== "cpassword"){
        body = {...body, [label]: value};
      }
    })

    this.isLoading = true;
    this.updateSignupBtn();

    this.post("auth/signup", body)
      .then(this.onSuccess.bind(this))
      .catch(this.onError.bind(this));    
  }

  updateSignupBtn(){
    if(!this.isLoading){
      this.btnSignup.innerHTML = "Sign Up";
    } else {
      this.btnSignup.innerHTML = 
        '<i class="fa fa-spinner fa-spin"></i>';
    }
  }

  onSuccess(data){
    this.isLoading = false;
    this.updateSignupBtn();
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
    this.updateSignupBtn();
    this.status.show(error, true);
  }

}


const register = new Register();

document.getElementById("form")
  .addEventListener("submit", (e) => {
    e.preventDefault();

    register.submit(e.target)
  });

