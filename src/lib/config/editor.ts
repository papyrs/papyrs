import {codeMenu} from '$lib/menus/code.menu';
import {code} from '$lib/plugins/code.plugin';
import {imgStorage} from '$lib/plugins/img.storage.plugin';
import {imgTenor} from '$lib/plugins/img.tenor.plugin';
import {imgUnsplash} from '$lib/plugins/img.unsplash.plugin';
import type {StyloConfig} from '@papyrs/stylo';
import {h1, h2, h3, hr, ul} from '@papyrs/stylo/dist/stylo/index.esm';

export const editorConfig: Partial<StyloConfig> = {
  plugins: [h1, h2, h3, ul, imgStorage, imgUnsplash, imgTenor, code, hr],
  menus: [codeMenu],
  excludeAttributes: ['id', 'hydrated', 'editable', 'paragraph_id', 'highlighted', 'custom-loader']
};
