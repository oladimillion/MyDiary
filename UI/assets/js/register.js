class Register extends Request{

  constructor(){
    super();
  }

  submit(form){
    const formData = new FormData(form);

    const errors = ValidateInput(formData);
    console.log(errors)

    if(errors.length){
      return;
    }

    this.post("signup", 
      { body: formData })
      .then(res => res.json())
      .then(this.onSuccess.bind(this))
      .catch(this.onError.bind(this));    
  }

  onSuccess(data){
    console.log(data);
  }

  onError(error){
    console.log(error);
  }

}


const register = new Register();

document.getElementById("form")
  .addEventListener("submit", (e) => {
    e.preventDefault();

    register.submit(e.target)
  });

