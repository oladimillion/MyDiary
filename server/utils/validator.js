export function Validator(data){
  let errors = [];
  if(!data || typeof data !== "object" || !Object.keys(data).length){
    return errors = [...errors, "All fields are required"];
  }

  Object.keys(data).forEach(key => {
    let value = data[key];
    if(!value){
      errors = [...errors, key + " is required"];
    }
  })

  return errors;
}
