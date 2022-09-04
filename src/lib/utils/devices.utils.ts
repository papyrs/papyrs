import {browser} from '$app/environment';

export const isMobile = (): boolean => {
  if (!browser) {
    return false;
  }

  const isTouchScreen: boolean = window.matchMedia('(any-pointer:coarse)').matches;
  const isMouseScreen: boolean = window.matchMedia('(any-pointer:fine)').matches;

  return isTouchScreen && !isMouseScreen;
};
