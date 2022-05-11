import type {StyloMenu} from '@papyrs/stylo';
import {deleteMenuAction} from '../utils/menu.utils';

export const imgMenu: StyloMenu = {
  match: ({paragraph}: {paragraph: HTMLElement}) => paragraph?.nodeName.toLowerCase() === 'figure',
  actions: [deleteMenuAction({text: 'img_delete'})]
};
