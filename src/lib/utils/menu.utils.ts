import type {SaveCode} from '$lib/types/code';
import type {PapyModal} from '$lib/types/modal';
import {emit} from '$lib/utils/events.utils';
import type {StorageFile} from '@deckdeckgo/editor';
import type {MonacoEditorOptions} from '@deckdeckgo/monaco-editor';
import type {StyloMenuAction} from '@papyrs/stylo/dist/types/types/menu';
import type {SaveExcalidraw} from '../types/excalidraw';

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

export const openEditCodeModal = async ({
  highlightCodeElement
}: {
  highlightCodeElement: HTMLElement;
}) => {
  const code: HTMLElement | null = highlightCodeElement.querySelector(':scope > code');

  document.addEventListener(
    'papySaveCode',
    async ({detail}: CustomEvent<SaveCode | undefined | null>) =>
      await editCode({code, detail, highlightCodeElement}),
    {once: true}
  );

  emitSnapshotParagraph(highlightCodeElement);

  const language: string | null = highlightCodeElement.getAttribute('language');
  const lineNumbers: string | null = highlightCodeElement.getAttribute('line-numbers');

  const options: MonacoEditorOptions = {
    ...(language !== null && language !== '' && {language}),
    lineNumbers: lineNumbers !== 'false' ? 'on' : 'off'
  };

  emit<PapyModal>({
    message: 'papyModal',
    detail: {type: 'code', detail: {code: code?.innerHTML || '', options}}
  });
};

export const openEditExcalidrawModal = async ({
  lazyImgElement
}: {
  lazyImgElement: HTMLDeckgoLazyImgElement;
}) => {
  document.addEventListener(
    'papySaveExcalidraw',
    async ({detail}: CustomEvent<SaveExcalidraw | undefined | null>) =>
      await editExcalidraw({detail, lazyImgElement}),
    {once: true}
  );

  emitSnapshotParagraph(lazyImgElement);

  const dataSrc: string | null = lazyImgElement.getAttribute('data-src');

  emit<PapyModal>({
    message: 'papyModal',
    detail: {type: 'excalidraw', detail: {dataSrc}}
  });
};

// Copy current paragraph for undo-redo "update" in case of changes
const emitSnapshotParagraph = (target: HTMLElement) => {
  const didUpdate: CustomEvent<HTMLElement> = new CustomEvent<HTMLElement>('snapshotParagraph', {
    bubbles: true,
    detail: target
  });

  target.dispatchEvent(didUpdate);
};

const editCode = async ({
  detail,
  code,
  highlightCodeElement
}: {
  detail: SaveCode | undefined | null;
  code: HTMLElement | null;
  highlightCodeElement: HTMLElement;
}) => {
  if (!detail) {
    // We emit an undefined value when we close/cancel the modal because we use a once event listener
    return;
  }

  const {code: innerHTML} = detail || {code: '\u200B'};

  if (!code) {
    // Should not happen, decgo-highlight-code are always create with a predefined even empty code slot
    const slot: HTMLElement = document.createElement('code');
    slot.setAttribute('slot', 'code');
    slot.innerHTML = innerHTML;

    highlightCodeElement.append(slot);
  } else {
    code.innerHTML = innerHTML;
  }

  const {language} = detail || {language: 'javascript'};
  highlightCodeElement.setAttribute('language', language);

  const {lineNumbers} = detail || {lineNumbers: true};
  highlightCodeElement.setAttribute('line-numbers', `${lineNumbers}`);

  await (highlightCodeElement as HTMLDeckgoHighlightCodeElement).load();
};

const editExcalidraw = async ({
  detail,
  lazyImgElement
}: {
  detail: SaveExcalidraw | undefined | null;
  lazyImgElement: HTMLDeckgoLazyImgElement;
}) => {
  if (!detail) {
    // We emit an undefined value when we close/cancel the modal because we use a once event listener
    return;
  }

  const {imgFile, dataFile} = detail;

  lazyImgElement.setAttribute('img-src', (imgFile as StorageFile).downloadUrl);
  lazyImgElement.setAttribute('data-src', dataFile.downloadUrl);

  await lazyImgElement.lazyLoad();
};
