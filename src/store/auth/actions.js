import jwtDecode from "jwt-decode";
import * as types from "./actionTypes";
import * as localStorageHelper from "../../helpers/localStorageHelper";
import * as constants from "../../resources/constants";
import { LOCAL_STORAGE_JWT } from "../../helpers/constants";
import userService from "../../services/userService";

export const saveUrlToRedirectAfterLogin = (url = constants.ROOT_PAGE) => {
  return {
    type: types.SAVE_URL_TO_REDIRECT_AFTER_LOGIN,
    url
  };
};

export const clearSavedUrlToRedirect = () => {
  return {
    type: types.CLEAR_URL_TO_REDIRECT_AFTER_LOGIN
  };
};

export const updateUserSession = data => {
  let { id, email, createdAt, updatedAt, username, bio, image, token } = data;
  return {
    type: types.UPDATE_USER_SESSION,
    id,
    email,
    createdAt,
    updatedAt,
    username,
    bio,
    image,
    token
  };
};

export const loginRequest = () => {
  return {
    type: types.LOG_IN_REQUEST
  };
};

export const loginSuccess = data => {
  let { id, email, createdAt, updatedAt, username, bio, image, token } = data;

  return {
    type: types.LOG_IN_SUCCESS,
    id,
    email,
    createdAt,
    updatedAt,
    username,
    bio,
    image,
    token
  };
};

export const loginError = (message, attempts) => {
  return {
    type: types.LOG_IN_ERROR,
    message,
    attempts
  };
};

export const loginCheck = (jwt, tokenPayload) => {
  return {
    type: types.LOG_IN_CHECK
  };
};

export const logOutRequest = () => {
  return {
    type: types.LOG_OUT_REQUEST
  };
};

export const logOutSuccess = () => {
  return {
    type: types.LOG_OUT_SUCCESS
  };
};

export const logOutError = () => {
  return {
    type: types.LOG_OUT_ERROR,
    message: "error loggin out"
  };
};

export const logOut = () => {
  const cleanup = () => {
    // We clean all the localStorage.
    cleanupLocalStorageDefault();
  };

  return dispatch => {
    dispatch(logOutRequest());
    cleanup();
    dispatch(logOutSuccess());
    dispatch(clearSavedUrlToRedirect());
  };
};

export const login = (email, password) => {
  return dispatch => {
    cleanupLocalStorageDefault();
    dispatch(loginRequest());
    return userService
      .userLogin(dispatch, email, password)
      .then(response => {
        // save token
        localStorageHelper.setItem(LOCAL_STORAGE_JWT, response.user.token);
        dispatch(loginSuccess(response.user));
        dispatch(clearSavedUrlToRedirect());
      })
      .catch(error => {
        const message =
          error && error.message ? error.message : "Unknown Error";
        dispatch(loginError(message, 0));
      });
  };
};

export const signupRequest = () => {
  return {
    type: types.SIGN_UP_REQUEST
  };
};

export const signupSuccess = () => {
  return {
    type: types.SIGN_UP_SUCCESS
  };
};

export const signupError = message => {
  return {
    type: types.SIGN_UP_ERROR,
    errorDescription: message.errors
  };
};

function getTokenPayload(token) {
  const payload = jwtDecode(token);
  return {
    id: payload.Id,
    username: payload.username,
    expiration: payload.exp
  };
}

function cleanupLocalStorageDefault() {
  localStorageHelper.removeItem(LOCAL_STORAGE_JWT);
}

export function tokenLoginSuccess(jwt, payload) {
  return {
    type: types.TOKEN_REFRESH_SUCCESS,
    jwt,
    id: payload.Id,
    username: payload.username,
    expiration: payload.exp
  };
}

export const processToken = (dispatch, token) => {
  cleanupLocalStorageDefault();
  localStorageHelper.setItem(LOCAL_STORAGE_JWT, token);
  const tokenPayload = getTokenPayload(token, dispatch);
  dispatch(tokenLoginSuccess(token, tokenPayload));
  return tokenPayload;
};

export function tokenLoginRequest(token) {
  return {
    type: types.TOKEN_REFRESH_REQUEST,
    token
  };
}

export const tokenLogin = token => {
  return function(dispatch) {
    dispatch(tokenLoginRequest(token));
    processToken(dispatch, token);
  };
};

export const signup = (username, email, password) => {
  return dispatch => {
    dispatch(signupRequest());
    userService
      .userSignup(dispatch, username, email, password)
      .then(response => {
        dispatch(signupSuccess());
        // save token
        localStorageHelper.setItem(LOCAL_STORAGE_JWT, response.user.token);
        dispatch(clearSavedUrlToRedirect());
        dispatch(signupSuccess());
      })
      .catch(error => {
        const message =
          error && error.payload ? error.payload : "Unknown Error";
        dispatch(signupError(message));
      });
  };
};

export function checkAndSetSessionState() {
  return function(dispatch) {
    if (!localStorageHelper.getItem(LOCAL_STORAGE_JWT)) {
      return;
    }
    const jwt = localStorageHelper.getItem(LOCAL_STORAGE_JWT);
    dispatch(tokenLogin(jwt));
  };
}
