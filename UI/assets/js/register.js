class Register extends Request{

  constructor(){
    super();
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
      console.log(errors)
      return;
    }

    let body = {};

    Array.from(formData).forEach(([label, value]) => {
      body = {...body, [label]: value};
    })

    this.isLoading = true;
    this.updateSignupBtn();

    this.post("auth/signup", body)
      .then(res => res.json())
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
    window.location.href = "entries.html";
  }

  onError(error){
    console.log(error);
    this.isLoading = false;
    this.updateSignupBtn();
  }

}


const register = new Register();

document.getElementById("form")
  .addEventListener("submit", (e) => {
    e.preventDefault();

    register.submit(e.target)
  });

