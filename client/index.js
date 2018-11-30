import React from "react";
import { render } from "react-dom";
import thunk from "redux-thunk";
import { createStore, applyMiddleware} from "redux";
import rootReducer from "./root-reducer";
import Root from "./root";
import SetAuthToken from "./utils/auth-token";
import jwtDecode from "jwt-decode";
import { Action } from "./actions/index";
import { USER } from "./actions/types";

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)


if(localStorage.token){
  SetAuthToken(localStorage.token);
  store.dispatch(Action(USER, jwtDecode(localStorage.token)));
}


render( 
  <Root store={store}/>,
  document.getElementById("root")
);
