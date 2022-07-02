import {get} from 'svelte/store';
import {theme} from '../stores/theme.store';

export const publishConfig = (): Record<string, string> => ({
  theme: get(theme),
  socialImgPath: import.meta.env.VITE_SOCIAL_IMG_CDN as string
});
