import React from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect
} from 'react-router-dom';
import { Provider } from "react-redux";


import Login from "./components/login";
import Header from "./components/header";
import Signup from "./components/signup";
import CreateEntry from "./components/create-entry";
import ViewEntry from "./components/view-entry";
import Profile from "./components/profile";
import MsgInfo from "./components/msg-info";
import Reminder from "./components/reminder";
import ProtectedRoute from "./protected-route";


import "../UI/assets/css/main.css";
import "../UI/assets/css/header.css";
import "../UI/assets/css/form.css";
import "../UI/assets/css/entry.css";
import "../UI/assets/css/entries.css";
import "../UI/assets/css/modal.css";
import "../UI/assets/css/optional.css";


const Root = ({store}) => (
  <Provider store={store}>
    <Router>
      <span>
        <Header />
        <MsgInfo />
        <Profile />
        <Reminder />
        <Switch>
          <Route 
            exact path="/" 
            component={ ProtectedRoute(ViewEntry) } 
          />
          <Route exact path="/login" component={ Login } />
          <Route exact path="/signup" component={ Signup } />
          <Route exact 
            path="/entry/create" 
            component={ ProtectedRoute(CreateEntry) } 
          />
          <Route exact 
            path="/entry/create/:entryId" 
            component={ ProtectedRoute(CreateEntry) } 
          />
          <Redirect to="/" />
        </Switch> 
      </span>
    </Router>
  </Provider>
)


export default Root;
