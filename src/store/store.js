import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducer";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

const middleware = [thunk, process.env.DEBUG && logger].filter(Boolean);

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
