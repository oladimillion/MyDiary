
class Modal {
  constructor(){
    this.modalReminder = document.getElementById("modal-reminder");
    this.modalProfile = document.getElementById("modal-profile");
  }

  toggleModalReminder(){
    this.modalReminder.classList.toggle("_hide");
  }

  toggleModalProfile(){
    this.modalProfile.classList.toggle("_hide");
  }
}


const modal = new Modal();

document.querySelectorAll(".cancel-btn")
  .forEach(element => {
    element.addEventListener("click", 
      modal.toggleModalReminder.bind(modal)
    );
  })


document.querySelectorAll(".cancel-profile-btn")
  .forEach(element => {
    element.addEventListener("click", 
      modal.toggleModalProfile.bind(modal)
    );
  })


