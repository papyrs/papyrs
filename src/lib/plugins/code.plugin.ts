import {openNewCodeModal} from '$lib/utils/plugin.utils';
import type {StyloPlugin, StyloPluginCreateParagraphsParams} from '@papyrs/stylo';

export const code: StyloPlugin = {
  text: 'code',
  icon: 'code',
  createParagraphs: (pluginParams: StyloPluginCreateParagraphsParams) =>
    openNewCodeModal({pluginParams})
};
