import type {Doc} from '@deckdeckgo/editor';
import {
  publish as publishDoc,
  publishUrl as publishUrlProvider,
  submitFeed as submitToFeed,
  type PublishInputs
} from '@deckdeckgo/sync';
import {toasts} from '../stores/toasts.store';
import {publishConfig} from '../utils/publish.utils';

export const publishUrl = async (doc: Doc): Promise<string> => {
  const url: string = await publishUrlProvider(doc?.data.meta);

  if (!url) {
    return window.location.href;
  }

  return url;
};

export const publish = async ({
  inputs,
  submitFeed
}: {
  inputs: PublishInputs;
  submitFeed: boolean;
}) => {
  await publishDoc({
    inputs,
    config: publishConfig()
  });

  if (!submitFeed) {
    return;
  }

  try {
    await submitToFeed();
  } catch (err) {
    console.error(err);

    toasts.show({
      text: 'The post was published but there was an unexpected error while submitting the feed.',
      level: 'warn'
    });
  }
};
