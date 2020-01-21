import * as types from './actionTypes';
import initialState from './InitialState';

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
        loggingOut: false,
        loggedOut: false,
        error: false,
        session: {
          ...state.session,
          token: action.token,
          user: {
            ...state.session.user,
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
        loggingOut: false,
        loggedOut: false,
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
          ...state.session,
          // TODO: we should spread the current state.session object
          token: action.jwt,
          expiration: action.expiration,
          user: {
            ...state.session.user,
            // TODO: we should spread the current state.session.user object
            id: action.id,
            username: action.username
          }
        }
      };
    }

    case types.LOG_OUT_REQUEST:
      return {
        ...state,
        logginOut: true
      };

    case types.LOG_OUT_SUCCESS:
      return {
        ...state,
        logginOut: false,
        loggedOut: true,
        loggingIn: false,
        loggedIn: false,
        error: false,
        session: {
          token: null,
          user: {
            id: null,
            email: null,
            createdAt: null,
            updatedAt: null,
            username: null,
            bio: null,
            image: null
          }
        }
      };

    case types.LOG_OUT_ERROR: {
      return {
        loggingOut: false,
        loggedOut: false,
        loggedIn: false,
        errorLogout: true,
        errorLogoutMessage: action.message,
        session: {
          ...state.session,
          token: null
        }
      };
    }

    case types.UPDATE_USER_SESSION:
      return {
        ...state,
        session: {
          ...state.session,
          token: action.token,
          user: {
            ...state.session.user,
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

    default:
      return state;
  }
};

export default reducer;
