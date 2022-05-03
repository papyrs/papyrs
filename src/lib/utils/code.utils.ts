import type {LanguageCode, SaveCode} from '$lib/types/code';
import type {PapyModal} from '$lib/types/modal';
import {emit} from '$lib/utils/events.utils';
import type {DeckdeckgoHighlightCodeLanguage} from '@deckdeckgo/highlight-code';
import {deckdeckgoHighlightCodeLanguages} from '@deckdeckgo/highlight-code/dist/deckdeckgo-highlight-code/index.esm';
import type {MonacoEditorOptions} from '@deckdeckgo/monaco-editor';

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

export const codeLanguages = (): LanguageCode[] => {
  const languages: LanguageCode[] = [];

  for (const key in deckdeckgoHighlightCodeLanguages) {
    const value: DeckdeckgoHighlightCodeLanguage = deckdeckgoHighlightCodeLanguages[key];

    languages.push({
      language: key,
      title: value.title
    });
  }

  return languages;
};
