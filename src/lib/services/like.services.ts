import type {Doc} from '@deckdeckgo/editor';
import {cloudProvider} from '../utils/providers.utils';
import type {CountInteractions} from "../types/interaction";

export const countInteractions = async (docs: Doc[]): Promise<CountInteractions> => {
  const {countInteractions} = await cloudProvider<{
    countInteractions: (params: {
      key: 'decks' | 'docs';
      ids: string[];
    }) => Promise<CountInteractions>;
  }>();

  return countInteractions({
    key: 'docs',
    ids: docs.map(({id}: Doc) => id)
  });
};
