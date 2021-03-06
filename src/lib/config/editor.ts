import {codeMenu} from '$lib/menus/code.menu';
import {code} from '$lib/plugins/code.plugin';
import {imgStorage} from '$lib/plugins/img.storage.plugin';
import {imgTenor} from '$lib/plugins/img.tenor.plugin';
import {imgUnsplash} from '$lib/plugins/img.unsplash.plugin';
import {dirtyAttributes} from '@deckdeckgo/editor';
import type {StyloConfig} from '@papyrs/stylo';
import {h1, h2, h3, hr, ul, ol} from '@papyrs/stylo/dist/stylo/index.esm';
import {imgMenu} from '../menus/img.menu';
import {excalidraw} from '../plugins/excalidraw.plugin';
import {excalidrawMenu} from '../menus/excalidraw.menu';

export const editorConfig: Partial<StyloConfig> = {
  plugins: [h1, h2, h3, ul, ol, imgStorage, imgUnsplash, imgTenor, code, excalidraw, hr],
  menus: [codeMenu, imgMenu, excalidrawMenu],
  attributes: {
    paragraphIdentifier: 'paragraph_id',
    exclude: dirtyAttributes
  }
};
