
class Modal extends Request {
  constructor(){
    super();

    this.modalReminder = document.getElementById("modal-reminder");
    this.modalProfile = document.getElementById("modal-profile");

    this.usernameTag = document.querySelector("#username");
    this.emailTag = document.querySelector("#email");

    this.userInfo = this.getUserInfo();
    this.setUserInfo(this.userInfo);
  }

  getUserInfo(){
    const userInfo = localStorage.getItem("user");
    if(userInfo){
      return JSON.parse(userInfo);
    }
    return null;
  }

  setUserInfo(userInfo){
    if(!userInfo){
      return;
    }
    this.usernameTag.value = userInfo.username;
    this.emailTag.value = userInfo.email;
  }

  submitProfile(form){
    const formData = new FormData(form);

    console.log(formData);
  }

  submitReminder(form){
    const formData = new FormData(form);

    console.log(formData);
  }

  toggleModalReminder(){
    this.modalReminder.classList.toggle("_hide");
  }

  toggleModalProfile(){
    this.modalProfile.classList.toggle("_hide");
  }
}


const modal = new Modal();


document.getElementById("profile-form")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    modal.submitProfile(e.target);
  });

document.getElementById("reminder-form")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    modal.submitReminder(e.target);
  });

document.querySelectorAll(".cancel-btn")
  .forEach(element => {
    element.addEventListener("click", 
      modal.toggleModalReminder.bind(modal)
    );
  });


document.querySelectorAll(".cancel-profile-btn")
  .forEach(element => {
    element.addEventListener("click", 
      modal.toggleModalProfile.bind(modal)
    );
  });


