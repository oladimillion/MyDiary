import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { AuthValidator as Validator } from "../utils/validators";
import AuthModel from "../models/auth-model";

dotenv.config();

class Auth {

  constructor(){
    this.authModel = new AuthModel();
  }

  delete(req, res){

    const data = Object.assign({}, {username: req.params.username});

    return this.authModel.delete(data)
      .then(result => {
        return res.status(204).json({
          message: "User deleted successfully",
        });
      })
      .catch(err => {
        return res.status(500).json({
          error: "User not deleted",
        });
      })
  }

  genToken(data){
    return jwt.sign({
      userId: data.user_id,
      username: data.username,
      email: data.email,
    }, process.env.JWT_SECRET);
  }

  login(req, res){

    const errors = Validator(req.body);

    if(Object.keys(errors).length){
      return res.status(400).json({
        errors,
      });
    }

    return this.authModel.login(req.body)
      .then(result => {
        if(result.exist){
          const { user_id, username, email } = result.user;
          return res.status(200).json({
            message: "Login successful",
            user: {username, email},
            token: this.genToken({user_id, username, email}),
          });
        } else {
          return res.status(400).json({
            error: "Authentication failed. Try again",
          });
        }
      })
      .catch(err => {
        return res.status(500).json({
          error: "Authentication failed. Try again",
        });
      })
  }

  signup(req, res){

    const errors = Validator(req.body);

    if(Object.keys(errors).length){
      return res.status(400).json({
        errors,
      });
    }

    return this.authModel.signup(req.body)
      .then((result) => {
        const { user_id, username, email } = result.rows[0];
        return res.status(201).json({
          message: "Registration successful",
          user: {username, email},
          token: this.genToken({user_id, username, email}),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          error: "Registration failed. Try again",
        });
      })
  }

  changeInfo(req, res){

    const errors = Validator(req.body);

    if(Object.keys(errors).length){
      return res.status(400).json({
        errors,
      });
    }

    return this.authModel
      .update(Object.assign(
        {}, 
        req.body, 
        {
          password: req.password,
          userId: req.userId,
        }
      ))
      .then((result) => {
        const { user_id, username, email } = result.rows[0];
        return res.status(200).json({
          message: "Profile successfully updated",
          user: {username, email},
          token: this.genToken({user_id, username, email}),
        });
      })
      .catch((err) => {
        console.log(err)
        return res.status(500).json({
          error: "Profile could not be updated",
        });
      })
  }

}

export default new Auth;
