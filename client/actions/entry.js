import axios from "axios";
import { 
  ENTRY_ADD, 
  ENTRY_ALL, 
  ENTRY_UPDATE,
  MSGINFO_FAILURE, 
  MSGINFO_SUCCESS,
} from "../actions/types";
import API from "./api";
import { Action } from "../actions/index";


export const GetEntryRequest = () => { 
  return dispatch => { 
    return axios.get(API + "entries")
      .then(({ data }) => { 
        dispatch(Action(ENTRY_ALL, data.entries));
        return data;
      })
      .catch(({ response }) => { 
        throw response;
      });
  }
}

export const CreateEntryRequest = (data) => { 
  return dispatch => { 
    return axios.post(API + "entries" , data)
      .then(({ data }) => { 
        dispatch(Action(MSGINFO_SUCCESS, data));
        dispatch(Action(ENTRY_ADD, data.entry));
        return data;
      })
      .catch(({ response }) => { 
        dispatch(Action(MSGINFO_FAILURE, response.data));
        throw response;
      });
  }
}

export const UpdateEntryRequest = (data, entryId) => { 
  return dispatch => { 
    return axios.put(API + "entries/"+entryId  , data)
      .then(({ data }) => { 
        dispatch(Action(MSGINFO_SUCCESS, data));
        dispatch(Action(ENTRY_UPDATE, data.entry));
        return data;
      })
      .catch(({ response }) => { 
        dispatch(Action(MSGINFO_FAILURE, response.data));
        throw response;
      });
  }
}
