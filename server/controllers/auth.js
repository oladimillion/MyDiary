import { GenId } from "../utils/common";
import { AuthValidator as Validator } from "../utils/validators";

class Auth {
  
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

export default new Auth;
