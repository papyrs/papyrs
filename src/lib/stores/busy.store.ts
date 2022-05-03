import {writable} from 'svelte/store';

export interface Busy {
  spinner: boolean;
  log: boolean;
  close: boolean;
}

const initBusyStore = () => {
  const {subscribe, set} = writable<Busy | undefined>(undefined);

  return {
    subscribe,

    start(log = false) {
      set({log, spinner: true, close: false});
    },

    show() {
      set({log: true, spinner: false, close: true});
    },

    stop() {
      set(undefined);
    }
  };
};

export const busy = initBusyStore();
