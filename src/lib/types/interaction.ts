import type {Interaction} from '@deckdeckgo/editor';

export interface CountInteraction {
  countLikes: bigint;
  like: Interaction | undefined;
  countComments: bigint;
}

// Record<docId, {likesCount, commentsCount}>
export type CountInteractions = Record<string, CountInteraction>;
