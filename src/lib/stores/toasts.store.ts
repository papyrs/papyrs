import {writable} from 'svelte/store';
import type {ToastMsg} from '../types/toast';
import {errorDetailToString} from '../utils/error.utils';

const initToastsStore = () => {
  const {subscribe, update} = writable<ToastMsg[]>([]);

  return {
    subscribe,

    error({text, detail}: {text: string; detail?: unknown}) {
      console.error(text, detail);
      update((messages: ToastMsg[]) => [
        ...messages,
        {text, level: 'error', detail: errorDetailToString(detail)}
      ]);
    },

    show(msg: ToastMsg) {
      update((messages: ToastMsg[]) => [...messages, msg]);
    },

    hide() {
      update((messages: ToastMsg[]) => messages.slice(1));
    }
  };
};

export const toasts = initToastsStore();
