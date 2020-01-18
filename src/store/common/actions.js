import * as types from "./actionTypes";

export const redirectUrlTo = url => {
  return {
    type: types.REDIRECT_URL_TO,
    url
  };
};

export const redirectTo = url => {
  return dispatch => {
    dispatch(redirectUrlTo(url));
  };
};
