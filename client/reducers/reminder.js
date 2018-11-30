import { 
  REMINDER_ADD,
  REMINDER_GET,
} from "../actions/types"

const initialState = { zoneOffset: "", time: "" };

const Reminder = (state = initialState, actions = {}) => { 

  switch(actions.type){ 

    case REMINDER_ADD:
      return { ...state, ...actions.payload };

    case REMINDER_GET:
      return actions.payload || initialState;

    default:
      return state
  }
}

export default Reminder;

