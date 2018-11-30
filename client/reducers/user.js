import { USER } from "../actions/types"

const User = (state = {}, actions = {}) => { 

  switch(actions.type){ 

    case USER:
      return actions.payload

    default:
      return state
  }
}

export default User;
