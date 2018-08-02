import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { AuthValidator as Validator } from "../utils/validators";
import SignupModel from "../models/signup-model";
import LoginModel from "../models/login-model";

dotenv.config();

class Auth {

  constructor(){
    this.loginModel = new LoginModel();
    this.signupModel = new SignupModel();
  }

  delete(req, res){

    const data = Object.assign({}, {username: req.params.username});

    return this.signupModel.delete(data)
      .then(result => {
        return res.status(200).json({
          message: "User deleted successfully",
        });
      })
      .catch(err => {
        return res.status(500).json({
          error: "User not deleted",
        });
      })
  }

  login(req, res){

    const errors = Validator(req.body);

    if(Object.keys(errors).length){
      return res.status(400).json({
        errors,
      });
    }

    return this.loginModel.login(req.body)
      .then(result => {
        const { user_id, username, email } = result.user;
        if(result.exist){
          return res.status(200).json({
            message: "Login successful",
            user: {userId: user_id, username, email},
            token: jwt.sign({
              userId: user_id,
            }, process.env.JWT_SECRET),
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

    return this.signupModel.signup(req.body)
      .then((result) => {
        const { user_id, username, email } = result.rows[0];
        return res.status(201).json({
          message: "Registration successful",
          user: {userId: user_id, username, email},
          token: jwt.sign({
            userId: user_id,
          }, process.env.JWT_SECRET),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          error: "Registration failed. Try again",
        });
      })
  }
}

export default new Auth;
