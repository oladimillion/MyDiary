export function Validator(data){
  let errors = {};
  if(!data || typeof data !== "object" || !Object.keys(data).length){
    return errors = Object.assign(
      {}, 
      errors, 
      {error: "All fields are required"}
    );
  }

  Object.keys(data).forEach(key => {
    let value = data[key];
    if(typeof value !== "string" || !value){
      Object.assign(
        errors, 
        {[key]: "This field is required"}
      );
    }
  })

  return errors;
}

export function AuthValidator(data){
  let errors = {};

  errors = Object.assign({}, Validator(data));

  Object.keys(data).forEach(key => {
    let value = data[key];

    if(value && value.length < 4){
      Object.assign(
        errors, 
        {[key]: "This field must be four characters long at least"}
      );
    }

    const re = /^[A-Za-z0-9._%-]{2,40}@[A-Za-z0-9.-]{2,20}.[A-Za-z]{2,10}$/
    if(key === "email" && !re.test(value)){
      Object.assign(
        errors, 
        {[key]: "Enter a valid email"}
      );
    }
  })

  return errors;
}
