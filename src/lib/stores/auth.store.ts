import {browser} from '$app/environment';
import type {AuthUser} from '@deckdeckgo/editor';
import {authSubscribe} from '@deckdeckgo/sync';
import {readable} from 'svelte/store';

export interface AuthStore {
  authUser: AuthUser | null;
  loggedIn: boolean;
}

const initAuthStore: AuthStore = {
  authUser: null,
  loggedIn: false
};

const start = (set) => {
  let subscriber: () => void | undefined = undefined;

  (async () => {
    if (!browser) {
      return;
    }

    subscriber = authSubscribe((authUser: AuthUser | null) =>
      set({authUser, loggedIn: authUser && authUser.state === 'authenticated'})
    );
  })();

  return function stop() {
    subscriber?.();
    set(initAuthStore);
  };
};

export const auth = readable<AuthStore>(initAuthStore, start);
