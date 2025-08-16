import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en/translation.json';
import sq from './sq/translation.json';

const resources = {
  en: {
    translation: en,
  },
  sq: {
    translation: sq,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    compatibilityJSON: 'v3', //To make it work for Android devices, add this line.
    resources,
    lng: 'en', // default language to use.
  });
export default i18n;
