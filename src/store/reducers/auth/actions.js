import * as types from "./actionTypes";
import axios from "../../../axios-base";
import * as localStorageHelper from "../../../helpers/localStorageHelper";
import * as constants from "../../../resources/constants";
import { LOCAL_STORAGE_JWT } from "../../../helpers/constants";

export function saveUrlToRedirectAfterLogin(url = constants.ROOT_PAGE) {
  return {
    type: types.SAVE_URL_TO_REDIRECT_AFTER_LOGIN,
    url
  };
}

export function clearSavedUrlToRedirect() {
  return {
    type: types.CLEAR_URL_TO_REDIRECT_AFTER_LOGIN
  };
}

export function loginRequest() {
  return {
    type: types.LOG_IN_REQUEST
  };
}

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

export function loginCheck(jwt, tokenPayload) {
  return {
    type: types.LOG_IN_CHECK
  };
}

export const login = (email, password) => {
  return dispatch => {
    dispatch(loginRequest());
    axios
      .post("/users/login", { user: { email, password } })
      .then(response => {
        // save token
        localStorageHelper.setItem(LOCAL_STORAGE_JWT, response.data.user.token);
        dispatch(loginSuccess(response.data));
        dispatch(clearSavedUrlToRedirect());
      })
      .catch(error => {
        console.log(error);
        dispatch(loginError(error.message, 0));
      });
  };
};
