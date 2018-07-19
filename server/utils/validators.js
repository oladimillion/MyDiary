export function Validator(data){
  let errors = [];
  if(!data || typeof data !== "object" || !Object.keys(data).length){
    return errors = [...errors, "All fields are required"];
  }

  Object.keys(data).forEach(key => {
    let value = data[key].trim();
    if(!value){
      errors = [...errors, key.replace("_", " ") + " is required"];
    }
  })

  return errors;
}

export function AuthValidator(data){
  let errors = [];

  errors = [...errors, ...Validator(data)];

  Object.keys(data).forEach(key => {
    let value = data[key].trim();

    if(value && value.length < 4){
      errors = [
        ...errors, 
        key + " must have four characters long at least"];
    }

    const re = /^[A-Za-z0-9._%-]{2,40}@[A-Za-z0-9.-]{2,20}.[A-Za-z]{2,10}$/
    if(key === "email" && !re.test(value)){
      return errors = [...errors, "Enter a valid email"];
    }
  })

  return errors;
}
