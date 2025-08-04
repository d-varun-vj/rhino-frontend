import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import commonEn from './namespaces/common/en.json';
import commonPl from './namespaces/common/pl.json';
import componentsEn from './namespaces/components/en.json';
import componentsPl from './namespaces/components/pl.json';
import layoutEn from './namespaces/layout/en.json';
import layoutPl from './namespaces/layout/pl.json';
import { pagesResources } from './namespaces/pages';

const resources = {
  en: {
    common: commonEn,
    components: componentsEn,
    layout: layoutEn,
    ...pagesResources.en,
  },
  pl: {
    common: commonPl,
    components: componentsPl,
    layout: layoutPl,
    ...pagesResources.pl,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources: resources,
    lng: 'en',
    fallbackLng: 'en',
    defaultNS: '',
    ns: ['common', 'components', 'layout', ...Object.keys(pagesResources.en)],
    interpolation: {
      escapeValue: false,
    },
  } as Parameters<typeof i18n.init>[0])
  .catch((err) => {
    console.error('i18next init error: ', err);
  });

export default i18n;
