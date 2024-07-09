import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

//global
import global_en from './en/global.json'
import global_pt from './pt/global.json'

//simplex
import simplex_en from './en/simplex.json'
import simplex_pt from './pt/simplex.json'

i18n
  .use(LanguageDetector) 
  .use(initReactI18next) 
  .init({
    resources: {
        en: {
            global: global_en,
            simplex: simplex_en
        },
        pt: {
            global: global_pt,
            simplex: simplex_pt 
            
        }
    },
    fallbackLng: 'en', 
    debug: true, 
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;