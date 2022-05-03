import type {UnsplashPhoto, UnsplashSearchResponse} from '@deckdeckgo/editor';

export const searchUnsplash = async ({
  searchTerm,
  next
}: {
  searchTerm: string;
  next: number;
}): Promise<UnsplashSearchResponse> => {
  const proxyUrl: string = import.meta.env.VITE_UNSPLASH_PROXY as string;

  const response = await fetch(`${proxyUrl}/search/photos/?query=${searchTerm}&page=${next}`);

  if (!response.ok) {
    throw new Error('Invalid unsplash search response');
  }

  return response.json();
};

export const registerUnsplashDownload = async ({
  id: photoId
}: UnsplashPhoto): Promise<UnsplashSearchResponse> => {
  const proxyUrl: string = import.meta.env.VITE_UNSPLASH_PROXY as string;

  const response = await fetch(`${proxyUrl}/photos/${photoId}/download/`);

  if (!response.ok) {
    throw new Error('Invalid unsplash download response');
  }

  return response.json();
};
