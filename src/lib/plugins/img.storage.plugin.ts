import {openImgModal} from '$lib/utils/plugin.utils';
import type {StyloPlugin, StyloPluginCreateParagraphsParams} from '@papyrs/stylo';

export const imgStorage: StyloPlugin = {
  text: 'image',
  icon: 'img',
  createParagraphs: (pluginParams: StyloPluginCreateParagraphsParams) =>
    openImgModal({pluginParams, modal: 'storage'})
};
