import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const DEFAULT_LANGUAGE = 'de'
export const LANGUAGES = ['uk', 'de']

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  de: {
    translation: require('./translations/de.json')
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: DEFAULT_LANGUAGE,

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });
