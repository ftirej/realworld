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
      action.authState.session = {
        ...action.authState.session,
        token: action.token,
        user: {
          ...action.authState.session.user,
          id: action.id,
          email: action.email,
          createdAt: action.createdAt,
          updatedAt: action.updatedAt,
          username: action.username,
          bio: action.bio,
          image: action.image
        }
      };

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
      break;
  }

  return state;
};

export default reducer;
