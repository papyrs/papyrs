import {browser} from '$app/env';
import type {LanguageCode} from '$lib/types/code';
import type {DeckdeckgoHighlightCodeLanguage} from '@deckdeckgo/highlight-code';
import {deckdeckgoHighlightCodeLanguages} from '@deckdeckgo/highlight-code/dist/deckdeckgo-highlight-code/index.esm';
import type {MonacoEditorOptions} from '@deckdeckgo/monaco-editor';

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

export const codeOptions = (): MonacoEditorOptions => {
  const {code_options: codeOptions}: Storage = browser
    ? localStorage
    : ({code_options: undefined} as unknown as Storage);

  if (codeOptions === undefined) {
    return {language: 'javascript', lineNumbers: 'off'};
  }

  return JSON.parse(codeOptions);
};

export const saveCodeOptions = (options: MonacoEditorOptions) =>
  localStorage.setItem('code_options', JSON.stringify(options));
