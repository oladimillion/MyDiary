
class Modal extends Request {
  constructor(){
    super();
    this.status = new Status();

    this.modalReminder = document.getElementById("modal-reminder");
    this.modalProfile = document.getElementById("modal-profile");
    this.saveBtns = document.querySelectorAll(".modal-save");

    this.username = document.querySelector("#username");
    this.email = document.querySelector("#email");
    this.newPassword = document.getElementById("newPassword");
    this.oldPassword = document.getElementById("oldPassword");
    this.time = document.getElementById("time");
    this.count = document.getElementById("count");

    this.isLoading = false;

    this.userData = this.getUserData();
    this.setUserData(this.userData);

    this.fetchReminder();

    this.zoneOffset = new Date().getTimezoneOffset().toString();
  }

  clearFields(){
    this.newPassword.value = "";
    this.oldPassword.value = "";
    this.time.value = "";
  }

  fetchReminder(){
    this.get("reminders")
      .then(this.onReminderFetch.bind(this))
      .catch(this.onError.bind(this));    
  }

  getUserData(){
    const userInfo = localStorage.getItem("user");
    if(userInfo){
      return JSON.parse(userInfo);
    }
    return null;
  }

  setUserData(userData){
    if(!userData){
      return;
    }
    this.username.value = userData.username;
    this.email.value = userData.email;
  }

  setTime(time=""){
    const savedTime = localStorage.getItem("time");
    if(!time && savedTime){
      time = savedTime;
    }
    time = time.substring(0, 5);
    this.time.value = time;
  }

  setEntryCount(count="0"){
    const savedCount = localStorage.getItem("entry-count");
    if(savedCount){
      count = savedCount;
    }
    this.count.value = count;
  }

  submitProfile(form){
    const formData = new FormData(form);

    let body = {};

    if(this.isLoading){
      return;
    }

    Array.from(formData).forEach(([label, value]) => {
      if(value.trim()){
        body = {...body, [label]: value};
      }
    })

    this.isLoading = true;
    this.updateSaveBtn();

    this.put("auth/update", body)
      .then(this.onSuccess.bind(this))
      .catch(this.onError.bind(this));    

  }

  submitReminder(form){
    const formData = new FormData(form);

    let body = {zoneOffset: this.zoneOffset};

    if(this.isLoading){
      return;
    }

    Array.from(formData).forEach(([label, value]) => {
      if(value.trim()){
        body = {...body, [label]: value};
      }
    })

    this.isLoading = true;
    this.updateSaveBtn();

    this.post("reminders", body)
      .then(this.onSuccess.bind(this))
      .catch(this.onError.bind(this));    
  }

  toggleModalReminder(){
    if(this.isLoading) return;
    this.modalReminder.classList.toggle("_hide");
    this.setTime();
    this.setEntryCount();
  }

  toggleModalProfile(){
    if(this.isLoading) return;
    this.clearFields();
    this.userData = this.getUserData();
    this.setUserData(this.userData);
    this.modalProfile.classList.toggle("_hide");
  }

  updateSaveBtn(){
    if(!this.isLoading){
      this.saveBtns.forEach((btn) => {
        btn.innerHTML = "Save";
      })
    } else {
      this.saveBtns.forEach((btn) => {
        btn.innerHTML = 
          '<i class="fa fa-spinner fa-spin"></i>';
      })
    }
  }

  onSuccess(data){
    this.isLoading = false;
    this.updateSaveBtn();
    const {token, user, reminder} = data;
    if(token){
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      this.toggleModalProfile();
    }
    if(reminder){
      localStorage.setItem("time", reminder.time);
      this.toggleModalReminder();
    }
    this.status.show(data);
  }

  onReminderFetch(data){
    if(data.reminders.length){
      const { time } = data.reminders[0];
      this.setTime(time);
      localStorage.setItem("time", time);
    }
  }

  onError(error){
    this.isLoading = false;
    this.updateSaveBtn();
    this.status.show(error, true);
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
    element.addEventListener("click", (e) => {
      modal.toggleModalReminder()
    });
  });


document.querySelectorAll(".cancel-profile-btn")
  .forEach(element => {
    element.addEventListener("click", 
      modal.toggleModalProfile.bind(modal)
    );
  });


