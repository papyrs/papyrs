import {browser} from '$app/env';
import {Theme} from '$lib/types/theme';
import {applyTheme} from '$lib/utils/theme.utils';
import {writable} from 'svelte/store';

const {theme: storageTheme}: Storage = browser
  ? localStorage
  : ({theme: undefined} as unknown as Storage);

const initialTheme: Theme = storageTheme ?? Theme.PAPAYA_WHIP;
applyTheme(initialTheme);

export const initTheme = () => {
  const {subscribe, set} = writable<Theme>(initialTheme);

  return {
    subscribe,

    select: (theme: Theme) => {
      applyTheme(theme);
      set(theme);
    }
  };
};

export const theme = initTheme();
