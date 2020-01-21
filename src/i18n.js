import { setTranslationsGetter, setLocaleGetter } from "react-i18nify";

export function syncTranslationWithStore(store) {
  setTranslationsGetter(() => {
    try {
      return store.getState().common.i18n.translations;
    } catch (e) {
      // ToDo: check what action we need to do if this happens.
    }
  });
  setLocaleGetter(() => {
    try {
      return store.getState().common.i18n.locale;
    } catch (e) {
      // ToDo: check what action we need to do if this happens.
    }
  });
}
