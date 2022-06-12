import type {StyloMenu} from '@papyrs/stylo';
import {deleteMenuAction, editMenuIcon, openEditCodeModal} from '../utils/menu.utils';

export const codeMenu: StyloMenu = {
  match: ({paragraph}: {paragraph: HTMLElement}) =>
    paragraph?.nodeName.toLowerCase() === 'deckgo-highlight-code',
  actions: [
    {
      text: 'edit_code',
      icon: editMenuIcon,
      action: async ({paragraph}: {paragraph: HTMLElement}) =>
        openEditCodeModal({highlightCodeElement: paragraph})
    },
    deleteMenuAction({text: 'delete_code'})
  ]
};
