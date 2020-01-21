import * as types from "./actionTypes";
import { logOut } from "../auth/actions";
import browserHistory from "../../routerHistory";

export default class serviceActions {
  handleServiceError(error) {
    return (dispatch, getState) => {
      const sessionCurrentState = getState().auth;

      switch (error.code) {
        case 401: {
          if (sessionCurrentState && !sessionCurrentState.loggingOut) {
            // If not loggingOut execute dispatch action.
            if (error.details.url !== "auth/login") {
              // For login we don't want to be logOut when 401 found.
              dispatch(logOut()); // dispatch logOut that will cleanLocalStorage, execute logout endpoint
              browserHistory.push("/login");
            }
            dispatch(this.serviceError(error));
          }
          break;
        }
        case 500: {
          dispatch(this.serviceError(error));
          break;
        }

        default: {
          dispatch(this.serviceError(error));
        }
      }
    };
  }

  serviceError(error) {
    return {
      type: types.SERVICE_ERROR,
      error
    };
  }
}
