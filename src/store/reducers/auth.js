import { LOGIN, LOGOUT } from "../../constants/actionTypes";

const initialState = {
  loggedIn: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggedIn: true
      };
    case LOGOUT:
      return {
        ...state,
        loggedIn: false
      };

    default:
      break;
  }
  return state;
};

export default reducer;
