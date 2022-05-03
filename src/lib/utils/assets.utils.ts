import type {Image} from '$lib/types/image';

export const isUnsplash = (img: Image): boolean =>
  Object.prototype.hasOwnProperty.call(img, 'urls');

export const isTenor = (img: Image): boolean => Object.prototype.hasOwnProperty.call(img, 'media');
