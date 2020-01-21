import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import * as types from './actionTypes'
import * as i18nActions from './actions'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('i18n Actions', () => {
  describe('i18n Actions - Load Translations', () => {
    it(`should be able to dispatch ${types.I18N_LOAD_TRANSLATIONS} when loadTranslations() action is called with correct parameters`, () => {
      // Arrange.
      const store = mockStore({})
      const translations = {
        'en': {
          'test': {
            'value1': 'value1'
          }
        }
      }

      // Act.
      store.dispatch(i18nActions.loadTranslations(translations))
      const actions = store.getActions()

      // Asset.
      expect(actions[0]).toEqual({
        type: types.I18N_LOAD_TRANSLATIONS,
        translations: translations
      })
    })
  })

  describe('i18n Actions - Set Locale', () => {
    it(`should be able to dispatch ${types.I18N_SET_LOCALE} when setLocale() action is called with correct parameters`, () => {
      // Arrange.
      const store = mockStore({})

      // Act.
      store.dispatch(i18nActions.setLocale('en'))
      const actions = store.getActions()

      // Asset.
      expect(actions[0]).toEqual({
        type: types.I18N_SET_LOCALE,
        locale: 'en'
      })
    })
  })
})
