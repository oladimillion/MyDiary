import axios from "axios";
import SetAuthToken from '../utils/auth-token';
import jwtDecode from 'jwt-decode';
import { Action } from "./index";

import API from "./api";

import { USER, MSGINFO_SUCCESS, MSGINFO_FAILURE, ENTRY_ALL } from "./types";


export const LogoutAction = () => {
  return dispatch => {
    localStorage.removeItem('token');
    dispatch(Action(USER, {}));
    dispatch(Action(ENTRY_ALL, []));
  }
}

export const LoginRequest = (data) => { 
  return dispatch => { 
    return axios.post(API + "auth/login" , data)
      .then(({ data }) => { 
        localStorage.setItem("token", data.token);
        SetAuthToken(data.token);
        dispatch(Action(USER, jwtDecode(data.token)));
        dispatch(Action(MSGINFO_SUCCESS, data));
        return data;
      })
      .catch(({ response }) => { 
        dispatch(Action(MSGINFO_FAILURE, response.data));
        throw response;
      })
  }
}

export const RegRequest = (data) => { 
  return dispatch => { 
    return axios.post(API + "auth/signup" , data)
      .then(({ data }) => { 
        dispatch(Action(MSGINFO_SUCCESS, data));
        return data;
      })
      .catch(({ response }) => { 
        dispatch(Action(MSGINFO_FAILURE, response.data));
        throw response;
      });
  }
}

export const ProfileRequest = (data) => { 
  return dispatch => { 
    return axios.put(API + "auth/update" , data)
      .then(({ data }) => { 
        localStorage.setItem("token", data.token);
        SetAuthToken(data.token);
        dispatch(Action(USER, jwtDecode(data.token)));
        dispatch(Action(MSGINFO_SUCCESS, data));
        return data;
      })
      .catch(({ response }) => { 
        dispatch(Action(MSGINFO_FAILURE, response.data));
        throw response;
      });
  }
}


