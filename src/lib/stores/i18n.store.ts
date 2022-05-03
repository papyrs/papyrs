import {writable} from 'svelte/store';
import en from '../i18n/en.json';

const esI18n = async (): Promise<I18n> => {
  return {
    lang: 'es',
    ...(await import(`../i18n/es.json`))
  };
};

const deI18n = async (): Promise<I18n> => {
  return {
    lang: 'de',
    ...(await import(`../i18n/de.json`))
  };
};

const nlI18n = async (): Promise<I18n> => {
  return {
    lang: 'nl',
    ...(await import(`../i18n/nl.json`))
  };
};

const enI18n = (): I18n => {
  return {
    lang: 'en',
    ...(en as Partial<I18n>)
  } as I18n;
};

export const initI18n = () => {
  const {subscribe, set} = writable<I18n>({
    lang: 'en',
    ...en
  });

  return {
    subscribe,

    switchLang: async (lang: Languages) => {
      let bundle: I18n;

      switch (lang) {
        case 'es':
          bundle = await esI18n();
          break;
        case 'de':
          bundle = await deI18n();
          break;
        case 'nl':
          bundle = await nlI18n();
          break;
        default:
          bundle = enI18n();
      }

      set(bundle);
    }
  };
};

export const i18n = initI18n();
