import type {LanguageCode} from '$lib/types/code';
import type {DeckdeckgoHighlightCodeLanguage} from '@deckdeckgo/highlight-code';
import {deckdeckgoHighlightCodeLanguages} from '@deckdeckgo/highlight-code/dist/deckdeckgo-highlight-code/index.esm';

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
