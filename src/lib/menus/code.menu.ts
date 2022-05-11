import {openEditCodeModal} from '$lib/utils/code.utils';
import type {StyloMenu} from '@papyrs/stylo';
import {deleteMenuAction} from '../utils/menu.utils';

// Svg: https://fonts.google.com/icons?selected=Material%20Icons%20Sharp%3Aedit%3A
export const codeMenu: StyloMenu = {
  match: ({paragraph}: {paragraph: HTMLElement}) =>
    paragraph?.nodeName.toLowerCase() === 'deckgo-highlight-code',
  actions: [
    {
      text: 'edit_code',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor">
                <path d="M0 0h24v24H0V0z" fill="none"/><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM21.41 6.34l-3.75-3.75-2.53 2.54 3.75 3.75 2.53-2.54z"/>
             </svg>`,
      action: async ({paragraph}: {paragraph: HTMLElement}) =>
        openEditCodeModal({highlightCodeElement: paragraph})
    },
    deleteMenuAction({text: 'delete_code'})
  ]
};
