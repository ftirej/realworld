import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";
import * as sessionActions from "./store/auth/actions";

store.dispatch(sessionActions.checkAndSetSessionState()); // Dispatch action that checks if the user is logged.

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
