import type {StyloMenuAction} from '@papyrs/stylo/dist/types/types/menu';

// Svg: https://fonts.google.com/icons?selected=Material%20Icons%20Sharp%3Adelete%3A
export const deleteMenuAction = ({text}: {text: string}): StyloMenuAction => ({
  text,
  icon: `<svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="currentColor"
            ><path d="M0 0h24v24H0V0z" fill="none" /><path
                d="M6 21h12V7H6v14zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" /></svg>`,
  action: async ({paragraph}: {paragraph: HTMLElement}) => {
    paragraph.parentElement.removeChild(paragraph);
  }
});

// Svg: https://fonts.google.com/icons?selected=Material%20Icons%20Sharp%3Aedit%3A
export const editMenuIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor">
    <path d="M0 0h24v24H0V0z" fill="none"/><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM21.41 6.34l-3.75-3.75-2.53 2.54 3.75 3.75 2.53-2.54z"/>
 </svg>`;
