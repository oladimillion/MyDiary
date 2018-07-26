import express from "express";
import auth from "../controllers/auth";

const route = express.Router();

route.post('/login', auth.login.bind(auth));
route.post('/signup', auth.signup.bind(auth));


export default route;
