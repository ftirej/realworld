import * as types from "./actionTypes";
import initialState from "./initialState";

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_SETTINGS_REQUEST:
      return {
        ...state,
        isUpdating: true
      };

    case types.UPDATE_SETTINGS_SUCCESS:
      return {
        ...state,
        isUpdating: false
      };

    case types.UPDATE_SETTINGS_ERROR:
      return {
        ...state,
        isUpdating: false,
        errorUpdating: true,
        errorMessage: action.message
      };

    default:
      return state;
  }
};

export default reducer;
