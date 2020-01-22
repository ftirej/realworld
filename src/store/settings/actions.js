import * as types from "./actionTypes";
import * as auth from "../auth/actions";
import settingsService from "../../services/settingsService";
import { redirectTo } from "../common/actions";

export const updateSettingsRequest = () => {
  return {
    type: types.UPDATE_SETTINGS_REQUEST
  };
};

export const updateSettingsSuccess = () => {
  return {
    type: types.UPDATE_SETTINGS_SUCCESS
  };
};

// export const updateSettingsSuccess = (data, authState) => {
//   let { id, email, createdAt, updatedAt, username, bio, image, token } = data;

//   return {
//     type: types.UPDATE_SETTINGS_SUCCESS,
//     authState,
//     id,
//     email,
//     createdAt,
//     updatedAt,
//     username,
//     bio,
//     image,
//     token
//   };
// };

export const updateSettingsError = message => {
  return {
    type: types.UPDATE_SETTINGS_ERROR,
    errorMessage: message
  };
};

export const updateSettings = (email, username, password, bio, image) => {
  return (dispatch, getState) => {
    //const { auth } = getState();
    dispatch(updateSettingsRequest());
    settingsService
      .updateSettings(dispatch, { image, username, password, email, bio })
      .then(response => {
        dispatch(auth.updateUserSession(response.user));
        dispatch(updateSettingsSuccess());
        dispatch(redirectTo("/"));
      })
      .catch(error => {
        const message =
          error && error.payload ? error.payload : "Unknown Error";
        dispatch(updateSettingsError(message));
      });
    // axios
    //   .put("/user", { user: { image, username, password, email, bio } })
    //   .then(response => {
    //     dispatch(auth.updateUserSession(response.data.user));
    //     dispatch(updateSettingsSuccess());
    //   })
    //   .catch(error => {
    //     dispatch(updateSettingsError(error.message));
    //   });
  };
};
