import {get} from 'svelte/store';
import {theme} from '../stores/theme.store';
import type {PublishOptions} from '../types/publish';
import {saveStorageOptions, storageOptions} from './storage.utils';

export const publishConfig = (): Record<string, string> => ({
  theme: get(theme),
  socialImgPath: import.meta.env.VITE_SOCIAL_IMG_CDN as string
});

export const publishOptions = (): PublishOptions =>
  storageOptions<PublishOptions>({
    key: 'publish_options',
    defaultValue: {lang: 'en'}
  });

export const savePublishOptions = (options: PublishOptions) =>
  saveStorageOptions<PublishOptions>({key: 'publish_options', options});
