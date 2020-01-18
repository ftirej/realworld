import * as types from "./actionTypes";
import initialState from "./initialState";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.REDIRECT_URL_TO:
      return {
        ...state,
        redirectTo: action.url
      };

    default:
      return state;
  }
};

export default reducer;
