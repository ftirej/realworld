import enTranslations from '../resources/locales/translations.en.json' // English
import esTranslations from '../resources/locales/translations.es.json' // Spanish
import frCaTranslations from '../resources/locales/translations.fr-ca.json' // French Canada
import etTranslations from '../resources/locales/translations.et.json' // Estonian
import deTranslations from '../resources/locales/translations.de.json' // German
import zhTranslations from '../resources/locales/translations.zh.json' // Simplified Chinese
import ruTranslations from '../resources/locales/translations.ru.json' // Russian
import itTranslations from '../resources/locales/translations.it.json' // Italian
import plTranslations from '../resources/locales/translations.pl.json' // Polski
import csTranslations from '../resources/locales/translations.cs.json' // Czech

import { SUPPORTED_LANGUAGES } from '../resources/constants'

export const translations = {
  'en': enTranslations,
  'es': esTranslations,
  'fr-CA': frCaTranslations,
  'et': etTranslations,
  'de': deTranslations,
  'ru': ruTranslations,
  'zh': zhTranslations,
  'it': itTranslations,
  'pl': plTranslations,
  'cs': csTranslations
}

export const findBrowserLanguage = browserLanguages => {
  if (browserLanguages && Array.isArray(browserLanguages)) {
    const findLanguage = element => { if (SUPPORTED_LANGUAGES.includes(element)) return element }
    return browserLanguages.find(findLanguage)
  }

  if (browserLanguages && typeof browserLanguages === 'string') {
    if (SUPPORTED_LANGUAGES.includes(browserLanguages)) return browserLanguages
  }
}
