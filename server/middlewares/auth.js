import bcrypt from "bcryptjs";
import AuthModel from "../models/auth-model";

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

export function ChangeInfoMiddleware(req, res, next){
  const errors = {};

  const { username, email, oldPassword, newPassword } = req.body;

  if(typeof username !== "string" || !username.trim()){
    Object.assign(
      errors, 
      {username: "This field is required"}
    );
  }

  if(oldPassword && !newPassword 
    || !oldPassword && newPassword ){
    Object.assign(
      errors, 
      {error: "Both old password and new password are required"}
    );
  } else if(oldPassword && newPassword){
    if(typeof oldPassword !== "string" || !oldPassword.trim()){
      Object.assign(
        errors, 
        {oldPassword: "This field is required"}
      );
    }
    if(typeof newPassword !== "string" || !newPassword.trim()){
      Object.assign(
        errors, 
        {newPassword: "This field is required"}
      );
    }

    const re = /([\s]+)/g;

    if(re.test(oldPassword)){
      Object.assign(
        errors, 
        {oldPassword: "oldPassword can not contain spaces"}
      );
    }
    if(re.test(newPassword)){
      Object.assign(
        errors, 
        {newPassword: "newPassword can not contain spaces"}
      );
    }
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

  return new AuthModel()
    .getOne(Object.assign({}, req.body, {userId: req.userId}))
    .then((result) => {

      let password = "";

      if(result.rowCount){
        password = result.rows[0].password;

        if(oldPassword && oldPassword.trim() &&
          !bcrypt.compareSync(req.body.oldPassword, password)){
          Object.assign(
            errors, 
            {oldPassword: "This field can not be verified"}
          );
        } else if(newPassword && newPassword.trim() &&
          bcrypt.compareSync(req.body.newPassword, password)){
          Object.assign(
            errors, 
            {newPassword: "You can not reuse your old password"}
          );
        }

        if(Object.keys(errors).length){
          return res.status(400).json({
            errors,
          })
        }

      }

      // in case user do not want to change password
      req.password = password;

      // check if username and email provide 
      // is in use by another user
      return VerifyExistingData(req, res, next);

    })
    .catch(err => {
      console.log(err)
      return res.status(500).json({
        error: "Profile could not be updated",
      })
    });
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

  return new AuthModel().isDataExisting(req.body)
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


function VerifyExistingData(req, res, next){

  const errors = {};

  return new AuthModel().isDataExisting(req.body)
    .then(([result1, result2]) => {

      const { username, email } = req.body;

      if(result1.rows.length && 
        (result1.rows[0].user_id !== req.userId)){
        Object.assign(
          errors, 
          {username: username + " already taken"}
        );
      }

      if(result2.rows.length && 
        (result2.rows[0].user_id !== req.userId)){
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
      console.log(err)
      return res.status(500).json({
        error: "Profile could not be updated",
      })
    });
}



