import axios from "axios";
import { 
  REMINDER_ADD, 
  REMINDER_GET, 
  MSGINFO_FAILURE, 
  MSGINFO_SUCCESS,
} from "../actions/types";
import API from "./api";
import { Action } from "../actions/index";




export const CreateReminderRequest = (data) => { 
  return dispatch => { 
    return axios.post(API + "reminders" , data)
      .then(({ data }) => { 
        dispatch(Action(MSGINFO_SUCCESS, data));
        dispatch(Action(REMINDER_ADD, data.reminder));
        return data;
      })
      .catch(({ response }) => { 
        dispatch(Action(MSGINFO_FAILURE, response.data));
        throw response;
      });
  }
}

export const GetReminderRequest = () => { 
  return dispatch => { 
    return axios.get(API + "reminders")
      .then(({ data }) => { 
        dispatch(Action(REMINDER_GET, data.reminders[0]));
        return data;
      })
      .catch(({ response }) => { 
        dispatch(Action(MSGINFO_FAILURE, response.data));
        throw response;
      });
  }
}
