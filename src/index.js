import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";
import * as sessionActions from "./store/auth/actions";
import { loadTranslations, setLocale } from "./store/common/i18n/actions";
import { syncTranslationWithStore } from "./i18n";
import { translations } from "./helpers/i18nHelper";

store.dispatch(sessionActions.checkAndSetSessionState()); // Dispatch action that checks if the user is logged.

syncTranslationWithStore(store);
store.dispatch(loadTranslations(translations));
store.dispatch(setLocale("en"));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
