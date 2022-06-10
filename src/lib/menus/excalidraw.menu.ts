import {openEditCodeModal} from '$lib/utils/code.utils';
import type {StyloMenu} from '@papyrs/stylo';
import {deleteMenuAction, editMenuIcon} from '../utils/menu.utils';

export const excalidrawMenu: StyloMenu = {
  match: ({paragraph}: {paragraph: HTMLElement}) =>
    paragraph?.nodeName.toLowerCase() === 'deckgo-lazy-img' && paragraph?.hasAttribute('data-src'),
  actions: [
    {
      text: 'edit_excalidraw',
      icon: editMenuIcon,
      action: async ({paragraph}: {paragraph: HTMLElement}) =>
        openEditCodeModal({highlightCodeElement: paragraph})
    },
    deleteMenuAction({text: 'delete_code'})
  ]
};
