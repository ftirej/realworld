import {
  LOGIN,
  LOGOUT
} from "../../constants/actionTypes";

export const logIn = (payload) {
  return {
    type: LOGIN,
    payload
  }
}

export const logOut = (payload) {
  return {
    type: LOGOUT,
    payload
  }
}