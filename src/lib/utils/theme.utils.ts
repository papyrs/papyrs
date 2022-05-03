import {browser} from '$app/env';
import type {Theme} from '$lib/types/theme';

export const applyTheme = (theme: Theme) => {
  if (!browser) {
    return;
  }

  const {documentElement, head} = document;

  documentElement.setAttribute('theme', theme);

  const color: string = getComputedStyle(documentElement).getPropertyValue('--color-theme');
  head.children.namedItem('theme-color').setAttribute('content', color.trim());

  localStorage.setItem('theme', theme);
};

export const primaryColor = (): string => {
  const {documentElement} = document;
  return getComputedStyle(documentElement).getPropertyValue('--color-primary');
};
