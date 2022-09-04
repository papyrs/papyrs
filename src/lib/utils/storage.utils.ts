import {browser} from '$app/environment';

export const storageOptions = <T>({key, defaultValue}: {key: string; defaultValue: T}): T => {
  const {[key]: options}: Storage = browser
    ? localStorage
    : ({[key]: undefined} as unknown as Storage);

  if ([null, undefined, ''].includes(options)) {
    return defaultValue;
  }

  return JSON.parse(options);
};

export const saveStorageOptions = <T>({key, options}: {key: string; options: T}) =>
  localStorage.setItem(key, JSON.stringify(options));
