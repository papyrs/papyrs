import {writable} from "svelte/store";

export const studioLoaded = writable<boolean>(false);
export const docReadyOnce = writable<boolean>(false);