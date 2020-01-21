import { forceComponentsUpdate } from "react-i18nify";
import * as types from "./actionTypes";

export function loadTranslationsSuccess(translations) {
  return {
    type: types.I18N_LOAD_TRANSLATIONS,
    translations
  };
}

export function setLocaleSuccess(locale) {
  return {
    type: types.I18N_SET_LOCALE,
    locale
  };
}

export function loadTranslations(translations) {
  return function(dispatch) {
    dispatch(loadTranslationsSuccess(translations));
    forceComponentsUpdate();
  };
}

export function setLocale(locale) {
  return function(dispatch) {
    dispatch(setLocaleSuccess(locale));
    forceComponentsUpdate();
  };
}
