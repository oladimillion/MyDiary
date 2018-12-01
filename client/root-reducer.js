import { combineReducers } from "redux";

import User from "./reducers/user";
import Entry from "./reducers/entry";
import Reminder from "./reducers/reminder";
import Info from "./reducers/msg-info";

export default combineReducers({
  User,
  Entry,
  Reminder,
  Info
});
