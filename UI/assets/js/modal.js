
class Modal {
  constructor(){
    this.modal = document.getElementById("modal");
  }

  toggleModal(){
    this.modal.classList.toggle("_hide");
  }
}


const modal = new Modal();

document.querySelectorAll(".cancel-btn")
  .forEach(element => {
    element.addEventListener("click", modal.toggleModal.bind(modal));
  })
