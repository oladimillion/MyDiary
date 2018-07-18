import { GenId } from "../utils/common";
import { Validator } from "../utils/validator";

class User {
  
  constructor(){
  }

  login(req, res, next){
    return res.status(200).json({
      message: ["Login route working"],
    });
  }

  signup(req, res, next){
    return res.status(200).json({
      message: ["Registration route working"],
    });
  }

}

export default new User;
