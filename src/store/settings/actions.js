import * as types from "./actionTypes";
import axios from "../../axios-base";

export const updateSettingsRequest = () => {
  return {
    type: types.UPDATE_SETTINGS_REQUEST
  };
};

export const updateSettingsSuccess = (data, authState) => {
  let { id, email, createdAt, updatedAt, username, bio, image, token } = data;

  return {
    type: types.UPDATE_SETTINGS_SUCCESS,
    authState,
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

export const updateSettingsError = message => {
  return {
    type: types.UPDATE_SETTINGS_ERROR,
    errorMessage: message
  };
};

export const updateSettings = (email, username, password, bio, image) => {
  return (dispatch, getState) => {
    const { auth } = getState();

    dispatch(updateSettingsRequest());
    axios
      .put("/user", { user: { image, username, password, email, bio } })
      .then(response => {
        dispatch(updateSettingsSuccess(response.data.user, auth));
      })
      .catch(error => {
        dispatch(updateSettingsError(error.message));
      });
  };
};
