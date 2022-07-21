import type {Doc} from '@deckdeckgo/editor';
import {
  publish as publishDoc,
  publishUrl as publishUrlProvider,
  type PublishInputs
} from '@deckdeckgo/sync';
import {get} from 'svelte/store';
import {doc} from '../stores/doc.store';
import {cloudProvider} from '../utils/providers.utils';
import {publishConfig} from '../utils/publish.utils';
import {toasts} from '../stores/toasts.store';

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

const submitToFeed = async () => {
  const {submitFeed} = await cloudProvider();

  const {doc: publishedDoc} = get(doc);

  // Should not happen
  if (!publishedDoc) {
    toasts.show({
      text: 'The post was published but could not be submitted to the feed.',
      level: 'warn'
    });
    return;
  }

  const {
    data: {meta},
    id
  } = publishedDoc;

  // Should not happen
  if (!meta) {
    toasts.show({
      text: 'The post was published but could not be submitted to the feed because there was no meta data to share.',
      level: 'warn'
    });
    return;
  }

  return submitFeed({meta, docId: id});
};
