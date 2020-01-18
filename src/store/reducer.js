import auth from "./auth/reducer";
import feed from "./feed/reducer";
import settings from "./settings/reducer";
import common from "./common/reducer";

import { combineReducers } from "redux";

export default combineReducers({
  auth,
  feed,
  settings,
  common
});
