import {browser} from '$app/env';
import type {
  TenorAnonymousResponse,
  TenorCategory,
  TenorCategoryResponse,
  TenorSearchResponse
} from '@deckdeckgo/editor';

export const searchCategories = async (): Promise<TenorCategory[]> => {
  const {url, key} = getTenorConfig();

  const anonymousId: string = await getAnonymousId();

  const searchUrl: string =
    url + 'categories?key=' + key + '&anon_id=' + (anonymousId || '') + '&media_filter=minimal';

  const rawResponse: Response = await fetch(searchUrl);

  const response: TenorCategoryResponse = JSON.parse(await rawResponse.text());

  if (!response) {
    throw new Error('Cannot search GIFs categories.');
  }

  return response.tags;
};

export const searchGifs = async ({
  searchTerm,
  next
}: {
  searchTerm: string;
  next: string | number;
}): Promise<TenorSearchResponse> => {
  const {url, key} = getTenorConfig();

  const anonymousId: string = await getAnonymousId();

  const searchUrl: string =
    url +
    'search?tag=' +
    searchTerm +
    '&key=' +
    key +
    '&ar_range=wide&limit=' +
    16 +
    '&anon_id=' +
    (anonymousId || '') +
    '&media_filter=minimal&pos=' +
    next;

  const rawResponse: Response = await fetch(searchUrl);

  const response: TenorSearchResponse = JSON.parse(await rawResponse.text());

  if (!response) {
    throw new Error('Cannot fetch GIFs');
  }

  return response;
};

export const getRandomGif = async (
  searchTerm: string
): Promise<TenorSearchResponse | undefined> => {
  const {url, key} = getTenorConfig();

  const anonymousId: string | undefined = await getAnonymousId();

  const searchUrl: string =
    url +
    'random?q=' +
    searchTerm +
    '&key=' +
    key +
    '&ar_range=standard&limit=' +
    1 +
    '&anon_id=' +
    (anonymousId || '') +
    '&media_filter=minimal';

  try {
    const rawResponse: Response = await fetch(searchUrl);

    const response: TenorSearchResponse | undefined = JSON.parse(await rawResponse.text());

    if (!response) {
      return undefined;
    }

    return response;
  } catch (err) {
    // We don't throw an error, in such a case we just not gonna display a gif
    return undefined;
  }
};

export const registerGif = async (gifId: string): Promise<void> => {
  const {url, key} = getTenorConfig();

  // It isn't mandatory to provide the anonymous ID therefore, as we rather not like to track even if anonymous, we don't provide it

  const shareUrl: string = url + 'registershare?key=' + key + '&id=' + gifId;

  try {
    await fetch(shareUrl);

    // We don't check the status of the answer, user can still use the Gifs even if fetch failed
  } catch (err) {
    // We ignore the error, user can still use the Gifs
    console.error(err);
  }
};

const getAnonymousId = async (): Promise<string | undefined> => {
  const {tenor_anonid: tenorAnonymousId}: Storage = browser
    ? localStorage
    : ({tenorAnonymousId: undefined} as unknown as Storage);

  if (tenorAnonymousId !== undefined) {
    return tenorAnonymousId;
  }

  const {url, key} = getTenorConfig();

  const rawResponse: Response = await fetch(url + 'anonid?key=' + key);

  const response: TenorAnonymousResponse = JSON.parse(await rawResponse.text());

  if (!response) {
    throw new Error('Tenor anonymous ID could not be fetched');
  }

  const {anon_id} = response;

  localStorage.setItem('tenor_anonid', anon_id);

  return anon_id;
};

const getTenorConfig = (): {url: string; key: string} => {
  const url: string = import.meta.env.VITE_TENOR_URL as string;
  const key: string = import.meta.env.VITE_TENOR_KEY as string;

  return {url, key};
};
