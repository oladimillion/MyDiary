
function ValidateInput(formData){
  let errors = {};
  for(let f of formData){
    if(!f[1]){
      const label = f[0] === "cpassword" ? "confirm password" : f[0];
      errors = {...errors, [label]: "This field is required"};
    }
  }

  return errors;
}

class TodayDate{

  fixLength(data=""){
    return data.length < 2 ? "0"+data : data;
  }

  getDate(data=Date.now()){
    let date = new Date(data)
      .toLocaleString()
      .split("/");

    return date[2].split(",")[0] +"-"+ 
      this.fixLength(date[0]) +"-"+ 
      this.fixLength(date[1]);      
  }
}

class Status {

  constructor(){
    this.showStatus = document.getElementById("show-status");
    this.statusWrapper = document.getElementById("status-wrapper");
    this.timerID = null;

    this.show = this.show.bind(this);
  }

  hide(){
    this.showStatus.classList.add("_hide");
  }

  clearTimer(){
    if(this.timerID){
      clearTimeout(this.timerID);
      this.timerID = null;
    }
  }

  show(msg, isError=false){

    this.removeFlags();
    this.clearTimer();

    if(isError){
      this.showStatus.classList.add("error");
    } else {
      this.showStatus.classList.add("success");
    }

    const {error, errors, message} = msg;

    if(error){
      this.appendMsg({error});
    } else if (message){
      this.appendMsg({message});
    } else if(errors) {
      this.appendMsg(errors);
    }

    this.showStatus.classList.remove("_hide");

    this.timerID = setTimeout(()=> {
      this.hide();
    }, 8000);
  }

  appendMsg(msg){
    let msgHtml = "";
    Object.keys(msg).forEach((label) => {
      msgHtml += `
        <tr>
          <td>${label.toUpperCase()}:</td>
          <td>${msg[label]}</td>
        </tr>
      `;
    });
    this.statusWrapper.innerHTML = msgHtml;
  }

  removeFlags(){
    this.showStatus.classList.remove("error");
    this.showStatus.classList.remove("success");
  }
}

