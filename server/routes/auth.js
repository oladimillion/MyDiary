import express from "express";
import auth from "../controllers/auth";
import { Private } from "../middlewares/private";
import { 
  SignupMiddleware, 
  LoginMiddleware,
} from "../middlewares/auth";

const route = express.Router();

route.post('/login', 
  LoginMiddleware, 
  auth.login.bind(auth), 
);

route.post('/signup', 
  SignupMiddleware, 
  auth.signup.bind(auth), 
);


export default route;
