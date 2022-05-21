import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locale/en.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translations: en }
    },
    lng: 'en',
    fallbackLng: 'en',
    debug: process.env.NODE_ENV !== 'production',
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
      formatSeparator: ',',
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;