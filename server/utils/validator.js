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
