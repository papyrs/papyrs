import {codeMenu} from '$lib/menus/code.menu';
import {code} from '$lib/plugins/code.plugin';
import {imgStorage} from '$lib/plugins/img.storage.plugin';
import {imgTenor} from '$lib/plugins/img.tenor.plugin';
import {imgUnsplash} from '$lib/plugins/img.unsplash.plugin';
import {dirtyAttributes} from '@deckdeckgo/editor';
import type {StyloConfig} from '@papyrs/stylo';
import {blockquote, h1, h2, h3, hr, ol, ul} from '@papyrs/stylo';
import {excalidrawMenu} from '../menus/excalidraw.menu';
import {imgMenu} from '../menus/img.menu';
import {excalidraw} from '../plugins/excalidraw.plugin';

export const editorConfig: Partial<StyloConfig> = {
  plugins: [
    h1,
    h2,
    h3,
    ul,
    ol,
    blockquote,
    imgStorage,
    imgUnsplash,
    imgTenor,
    code,
    excalidraw,
    hr
  ],
  menus: [codeMenu, imgMenu, excalidrawMenu],
  attributes: {
    paragraphIdentifier: 'paragraph_id',
    exclude: dirtyAttributes
  }
};
