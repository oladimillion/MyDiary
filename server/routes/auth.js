import express from "express";
import auth from "../controllers/auth";
import { Private } from "../middlewares/private";
import { 
  SignupMiddleware, 
  LoginMiddleware,
  ChangeInfoMiddleware, 
} from "../middlewares/auth";

const route = express.Router();

route.post('/login', 
  LoginMiddleware, 
  auth.login.bind(auth), 
);

route.put('/update', 
  Private,
  ChangeInfoMiddleware, 
  auth.changeInfo.bind(auth), 
);

route.post('/signup', 
  SignupMiddleware, 
  auth.signup.bind(auth), 
);

if(process.env.NODE_ENV !== "production"){
  // delete a user: for test purpose alone
  route.delete('/:username', 
    Private,
    auth.delete.bind(auth), 
  );
}


export default route;
