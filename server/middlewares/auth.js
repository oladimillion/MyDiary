import SignupModel from "../models/signup-model";

export function LoginMiddleware(req, res, next){

  const errors = {};

  const { username, password } = req.body;

  if(typeof username !== "string" || !username.trim()){
    Object.assign(
      errors, 
      {username: "This field is required"}
    );
  }

  if(typeof username !== "string" || !password.trim()){
    Object.assign(
      errors, 
      {password: "This field is required"}
    );
  }

  if(Object.keys(errors).length){
    return res.status(400).json({
      errors,
    })
  }

  next();
}


export function SignupMiddleware(req, res, next){
  const errors = {};

  const { username, email, password } = req.body;

  if(typeof username !== "string" || !username.trim()){
    Object.assign(
      errors, 
      {username: "This field is required"}
    );
  }

  if(typeof password !== "string" || !password.trim()){
    Object.assign(
      errors, 
      {password: "This field is required"}
    );
  }

  const re = /([\s]+)/g;

  if(re.test(password)){
    Object.assign(
      errors, 
      {password: "Password can not contain spaces"}
    );
  }

  if(typeof email !== "string" || !email.trim()){
    Object.assign(
      errors, 
      {email: "This field is required"}
    );
  }

  if(Object.keys(errors).length){
    return res.status(400).json({
      errors,
    })
  }

  const signupModel = new SignupModel();

  return signupModel.isDataExisting(req.body)
    .then(([result1, result2]) => {

      if(result1.rows.length){
        Object.assign(
          errors, 
          {username: username + " already taken"}
        );
      }

      if(result2.rows.length){
        Object.assign(
          errors, 
          {email: email + " already taken"}
        );
      }

      if(Object.keys(errors).length){
        return res.status(409).json({
          errors,
        })
      }
      next();
    })
    .catch(err => {
      return res.status(500).json({
        error: "Registration failed. Try again",
      })
    });
}
