import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enJSON from './en.json';
import plJSON from './pl.json';
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { ...enJSON },
      pl: { ...plJSON },
    },
    lng: 'en', // Set the initial language of the App
  })
  .catch((err) => {
    console.error('i18next init error: ', err);
  });
