export interface CountInteraction {
  likes: bigint;
  comments: bigint;
}

// Record<docId, {likesCount, commentsCount}>
export type CountInteractions = Record<string, CountInteraction>;
