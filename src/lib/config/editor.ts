import {codeMenu} from '$lib/menus/code.menu';
import {code} from '$lib/plugins/code.plugin';
import {imgStorage} from '$lib/plugins/img.storage.plugin';
import {imgTenor} from '$lib/plugins/img.tenor.plugin';
import {imgUnsplash} from '$lib/plugins/img.unsplash.plugin';
import {dirtyAttributes} from '@deckdeckgo/editor';
import type {StyloConfig} from '@papyrs/stylo';
import {h1, h2, h3, hr, ul} from '@papyrs/stylo/dist/stylo/index.esm';
import {imgMenu} from '../menus/img.menu';

export const editorConfig: Partial<StyloConfig> = {
  plugins: [h1, h2, h3, ul, imgStorage, imgUnsplash, imgTenor, code, hr],
  menus: [codeMenu, imgMenu],
  attributes: {
    paragraphIdentifier: 'paragraph_id',
    exclude: dirtyAttributes
  }
};
