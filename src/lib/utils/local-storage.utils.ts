import {browser} from '$app/environment';
import type {Languages} from '@papyrs/stylo';
import {Theme} from '$lib/types/theme';

export const setLocalStorageItem = ({key, value}: {key: string; value: string}) => {
  try {
    localStorage.setItem(key, value);
  } catch (err: unknown) {
    // We ignore the error until we can extra proxy/signin to auth.papy.rs
  }
};

export const getLocalStorageLang = (): Languages => {
  try {
    const {lang}: Storage = browser ? localStorage : ({lang: 'en'} as unknown as Storage);
    return lang;
  } catch (err: unknown) {
    // We ignore the error until we can extra proxy/signin to auth.papy.rs
    return 'en';
  }
};

export const getLocalStorageTheme = (): Theme => {
  try {
    const {theme: storageTheme}: Storage = browser
      ? localStorage
      : ({theme: undefined} as unknown as Storage);
    return storageTheme ?? Theme.PAPAYA_WHIP;
  } catch (err: unknown) {
    // We ignore the error until we can extra proxy/signin to auth.papy.rs
    return Theme.PAPAYA_WHIP;
  }
};
