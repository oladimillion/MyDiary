import express from "express";
import user from "../controllers/user";

const route = express.Router();

route.post('/login', user.login.bind(user));
route.post('/signup', user.signup.bind(user));


export default route;
