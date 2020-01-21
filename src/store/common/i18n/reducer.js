import * as types from './actionTypes'
import initialState from './initialState'

export default (state = initialState, action) => {
  switch (action.type) {
    case types.I18N_LOAD_TRANSLATIONS:
      return {
        ...state,
        translations: action.translations
      }
    case types.I18N_SET_LOCALE:
      return {
        ...state,
        locale: action.locale
      }
    default:
      return state
  }
}
