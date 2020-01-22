import { t } from "react-i18nify";
import initialState from "./initialState";
import reducer from "./reducer";
import * as actions from "./actions";
import * as actionTypes from "./actionTypes";

describe("i18n Reducer", () => {
  describe("i18n Reducer - Load Translations", () => {
    it(`should work when passed ${actionTypes.I18N_LOAD_TRANSLATIONS}`, () => {
      // Arrange.
      const translations = {
        en: {
          test: {
            value1: "Value1"
          }
        }
      };

      actions.loadTranslations(translations);

      // Assert.
      expect(t("test.value1")).toEqual("value1");
    });
  });

  describe("i18n Reducer - Set Locale", () => {
    it(`should work when passed ${actionTypes.I18N_SET_LOCALE}`, () => {
      // Arrange.
      const language = "en";
      const action = actions.setLocale(language);

      // Act.
      const newState = reducer(initialState, action);

      // Assert.
      expect(newState).not.toBeNull();
    });
  });
});
