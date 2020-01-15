import auth from "./auth/reducer";
import feed from "./feed/reducer";

import { combineReducers } from "redux";

export default combineReducers({
  auth,
  feed
});
