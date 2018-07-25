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

  login(req, res, next){
    return this.loginModel.login(req.body)
      .then(result => {
        if(result.exist){
          return res.status(200).json({
            message: "Login successful",
            token: jwt.sign({
              user_id: result.user.user_id,
              username: result.user.username,
              email: result.user.email,
            }, process.env.JWT_SECRET),
          });
        } else {
          return res.status(400).json({
            error: "Authentication failed. Try again",
          });
        }
      })
      .catch(err => {
        console.log(err)
        return res.status(400).json({
          error: "Authentication failed. Try again",
        });
      })
  }

  signup(req, res, next){
    return this.signupModel.signup(req.body)
      .then((result) => {
        const { user_id, username, email } = result.rows[0];
        return res.status(200).json({
          message: "Registration successful",
          token: jwt.sign({
            user_id,
            username,
            email,
          }, process.env.JWT_SECRET),
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({
          error: "Registration failed. Try again",
        });
      })
  }
}

export default new Auth;
