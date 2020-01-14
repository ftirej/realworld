import * as types from "./actionTypes";
import initialState from "./InitialState";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOG_IN_REQUEST:
      return {
        ...state,
        loggingIn: true,
        error: false,
        errorMessage: null
      };

    case types.LOG_IN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        loggedIn: true,
        error: false,
        session: {
          token: action.token,
          user: {
            id: action.id,
            email: action.email,
            createdAt: action.createdAt,
            updatedAt: action.updatedAt,
            username: action.username,
            bio: action.bio,
            image: action.image
          }
        }
      };

    case types.LOG_IN_ERROR:
      return {
        ...state,
        loggingIn: false,
        loggedIn: false,
        error: true,
        errorMessage: action.message,
        attempts: action.attempts,
        session: {
          // TODO we should spread the current state.session object
          token: null
        }
      };

    case types.SAVE_URL_TO_REDIRECT_AFTER_LOGIN:
      return {
        ...state,
        urlAfterLogin: action.url
      };

    case types.CLEAR_URL_TO_REDIRECT_AFTER_LOGIN:
      return {
        ...state,
        urlAfterLogin: initialState.urlAfterLogin
      };

    default:
      break;
  }
  return state;
};

export default reducer;
