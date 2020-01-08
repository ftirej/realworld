import { applyMiddleware, createStore } from "redux";
import reducer from "./reducer";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(createLogger))
);
