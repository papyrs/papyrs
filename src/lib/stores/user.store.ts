import {browser} from '$app/env';
import type {User, UserSocial} from '@deckdeckgo/editor';
import {userSubscribe} from '@deckdeckgo/sync';
import {readable} from 'svelte/store';

interface UserStore {
  user: User | undefined;
  photoUrl: string | undefined;
  name: string | undefined;
  social: UserSocial | undefined;
}

const initUserStore: UserStore = {
  user: undefined,
  photoUrl: undefined,
  name: undefined,
  social: undefined
};

const start = (set) => {
  let subscriber: () => void | undefined = undefined;

  (async () => {
    if (!browser) {
      return;
    }

    subscriber = userSubscribe((user: User | undefined) =>
      set({
        user,
        photoUrl: user?.data?.photo_url ?? undefined,
        name: user?.data?.name ?? undefined,
        social: user?.data?.social ?? undefined
      })
    );
  })();

  return function stop() {
    subscriber?.();
    set(initUserStore);
  };
};

export const user = readable<UserStore>(initUserStore, start);
