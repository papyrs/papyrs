import en from '$lib/i18n/en.json';
import {getLocalStorageLang, setLocalStorageItem} from '$lib/utils/local-storage.utils';
import {switchLang as switchUILang} from '@papyrs/ui';
import {writable} from 'svelte/store';

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

const jaI18n = async (): Promise<I18n> => {
  return {
    lang: 'ja',
    ...(await import(`../i18n/ja.json`))
  };
};

const zhCnI18n = async (): Promise<I18n> => {
  return {
    lang: 'zh-cn',
    ...(await import(`../i18n/zh-cn.json`))
  };
};

const enI18n = (): I18n => {
  return {
    lang: 'en',
    ...(en as Partial<I18n>)
  } as I18n;
};

const loadLanguage = (lang: Languages): Promise<I18n> => {
  switch (lang) {
    case 'es':
      return esI18n();
    case 'de':
      return deI18n();
    case 'nl':
      return nlI18n();
    case 'ja':
      return jaI18n();
    case 'zh-cn':
      return zhCnI18n();
    default:
      return Promise.resolve(enI18n());
  }
};

const switchLanguage = async (lang: Languages) => {
  await switchUILang(lang);
  setLocalStorageItem({key: 'lang', value: lang});
};

export const initI18n = () => {
  const {subscribe, set} = writable<I18n>({
    lang: 'en',
    ...en
  });

  return {
    subscribe,

    init: async () => {
      const lang: Languages = getLocalStorageLang();

      if (lang === 'en') {
        await switchLanguage(lang);

        // No need to reload the store
        return;
      }

      const bundle: I18n = await loadLanguage(lang);
      set(bundle);

      await switchLanguage(lang);
    },

    switchLang: async (lang: Languages) => {
      const bundle: I18n = await loadLanguage(lang);
      set(bundle);

      await switchLanguage(lang);
    }
  };
};

export const i18n = initI18n();
