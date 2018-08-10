class Header{

  constructor(){
    this.settingsDropdown = 
      document.getElementById("settings-dropdown");
    this.timerID = null;
    this.logoutBtn = document.getElementById("logout");
  }

  clearTimeout(){
    if(this.timerID){
      clearTimeout(this.timerID);
      this.timerID = null;
    }
  }

  hideSettingItem(){
    this.clearTimeout();
    this.timerID = setTimeout(() => {
      this.settingsDropdown.classList.add("hide");
    }, 200);
  }

  showSettingItem(){
    this.clearTimeout()
    this.settingsDropdown.classList.remove("hide");
  }

  logout(){
    localStorage.removeItem("user");
    localStorage.removeItem("time");
    localStorage.removeItem("entry-count");
    localStorage.removeItem("token");
    localStorage.removeItem("entry");
    window.location.href = "login.html";
  }
}


const header = new Header();

document.getElementById("settings-btn")
  .addEventListener("click", (e) => header.showSettingItem());

document.getElementsByTagName("body")[0]
  .addEventListener("click", (e) => {
    if(e.target.id !== "settings-btn" 
      && e.target.id !== "settings-icon"){
      header.hideSettingItem();
    }
  });


header.logoutBtn.addEventListener("click", (e) => header.logout());


