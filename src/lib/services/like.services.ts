import type {Doc} from '@deckdeckgo/editor';
import type {Interaction} from '@deckdeckgo/editor';
import type {CountInteractions} from '../types/interaction';
import {cloudProvider} from '../utils/providers.utils';

export const countInteractions = async (docs: Doc[]): Promise<CountInteractions> => {
  const {listInteractions} = await cloudProvider<{
    listInteractions: (params: {
      key: 'decks' | 'docs';
      ids: string[];
    }) => Promise<CountInteractions>;
  }>();

  return listInteractions({
    key: 'docs',
    ids: docs.map(({id}: Doc) => id)
  });
};

export const likeDislike = async ({
  docId,
  like
}: {
  docId: string,
  like: Interaction | undefined
}): Promise<Interaction> => {
  const {putInteraction} = await cloudProvider<{
    putInteraction: (params: {
      key: 'decks' | 'docs';
      id: string | undefined;
      interaction: Interaction | undefined;
      type: 'like' | 'comment';
    }) => Promise<Interaction>;
  }>();

  return putInteraction({
    key: 'docs',
    id: docId,
    interaction: like,
    type: 'like'
  });
};
