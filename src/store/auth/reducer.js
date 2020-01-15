import * as types from "./actionTypes";
import initialState from "./initialState";

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

    case types.SIGN_UP_REQUEST:
      return {
        ...state,
        userCreated: false,
        loggedIn: false,
        signingUp: true,
        error: false,
        errorCode: null,
        errorDescription: null
      };

    case types.SIGN_UP_SUCCESS:
      return {
        ...state,
        userCreated: true,
        loggedIn: true,
        signingUp: false,
        error: false,
        emailSent: true
      };

    case types.SIGN_UP_ERROR:
      return {
        ...state,
        // TODO: add signingUp, errorCode and errorDescription to the initialState
        signingUp: false,
        loggedIn: false,
        error: true,
        errorCode: action.errorCode,
        errorDescription: action.errorDescription
      };

    case types.SIGN_UP_DONE:
      return {
        ...state,
        // TODO: add emailSent to the initialState
        emailSent: false
      };

    case types.TOKEN_REFRESH_SUCCESS: {
      return {
        ...state,
        loggingIn: false,
        loggedIn: true,
        error: false,
        session: {
          // TODO: we should spread the current state.session object
          token: action.jwt,
          expiration: action.expiration,
          user: {
            // TODO: we should spread the current state.session.user object
            id: action.id,
            username: action.username
          }
        }
      };
    }

    default:
      break;
  }
  return state;
};

export default reducer;
