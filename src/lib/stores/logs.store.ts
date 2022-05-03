import type {Log} from '@deckdeckgo/editor';
import {writable} from 'svelte/store';

export const logs = writable<Log[]>([]);
