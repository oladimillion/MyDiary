import { MSGINFO_SUCCESS, MSGINFO_FAILURE } from "../actions/types";

const MsgInfo = (state = {}, actions = {}) => { 

  switch(actions.type){ 

    case MSGINFO_SUCCESS:
      return {
        success: true, 
        ...actions.payload
      }

    case MSGINFO_FAILURE:
      return {
        success: false, 
        ...actions.payload
      }

    default:
      return state
  }
}

export default MsgInfo;
