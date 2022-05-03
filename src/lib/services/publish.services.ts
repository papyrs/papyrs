import type {Doc} from '@deckdeckgo/editor';
import {publishUrl as publishUrlProvider} from '@deckdeckgo/sync';

export const publishUrl = async (doc: Doc): Promise<string> => {
  const url: string = await publishUrlProvider(doc?.data.meta);

  if (!url) {
    return window.location.href;
  }

  return url;
};
