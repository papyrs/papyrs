import type {LanguageCode} from '$lib/types/code';
import type {DeckdeckgoHighlightCodeLanguage} from '@deckdeckgo/highlight-code';
import {deckdeckgoHighlightCodeLanguages} from '@deckdeckgo/highlight-code';
import type {MonacoEditorOptions} from '@deckdeckgo/monaco-editor';
import {saveStorageOptions, storageOptions} from './storage.utils';

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

export const codeOptions = (): MonacoEditorOptions =>
  storageOptions<MonacoEditorOptions>({
    key: 'code_options',
    defaultValue: {language: 'javascript', lineNumbers: 'off'}
  });

export const saveCodeOptions = (options: MonacoEditorOptions) =>
  saveStorageOptions<MonacoEditorOptions>({key: 'code_options', options});
