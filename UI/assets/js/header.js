class Header{

  constructor(){
    this.settingsDropdown = 
      document.getElementById("settings-dropdown");
    this.timerID = null;
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
    console.log("logging out");
    window.location.href = "/UI/login.html";
  }
}


const header = new Header();

document.getElementById("settings-btn")
  .addEventListener("click", (e) => header.showSettingItem());

document.getElementsByTagName("body")[0]
  .addEventListener("click", (e) => {
    if(e.target.id !== "settings-btn"){
      header.hideSettingItem();
    }
  });

document.getElementById("logout")
  .addEventListener("click", (e) => header.logout());


