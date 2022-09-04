import {browser} from '$app/environment';
import type {Doc} from '@deckdeckgo/editor';
import {docSubscribe} from '@deckdeckgo/sync';
import {readable} from 'svelte/store';

interface DocStore {
  doc: Doc | null;
  name: string | null;
  published: boolean;
}

const initDocStore: DocStore = {
  doc: null,
  name: null,
  published: false
};

const start = (set) => {
  let subscriber: () => void | undefined = undefined;

  (async () => {
    if (!browser) {
      return;
    }

    subscriber = docSubscribe((doc: Doc | null) => {
      const name: string | null = doc?.data?.name && doc?.data?.name !== '' ? doc.data.name : null;

      set({
        doc,
        name,
        published: doc?.data?.meta?.published ?? false
      });

      document.title = name ?? 'Papyrs';
    });
  })();

  return function stop() {
    subscriber?.();
    set(initDocStore);
  };
};

export const doc = readable<DocStore>(initDocStore, start);
