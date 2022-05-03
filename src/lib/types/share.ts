import type {UserSocial} from '@deckdeckgo/editor';

export interface ShareData {
  title: string;
  userName: string | undefined;
  userSocial: UserSocial | undefined;
  publishedUrl: string;
}
