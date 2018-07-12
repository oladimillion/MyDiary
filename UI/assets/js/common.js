// show/hide settings dropdown
//

function ValidateInput(formData){
  let errors = [];
  for(let f of formData){
    if(!f[1]){
      const label = f[0] === "cpassword" ? "confirm password" : f[0];
      errors = [...errors, label + " is required"];
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


