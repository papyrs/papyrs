import {publishUrl} from '$lib/services/publish.services';
import {doc as docStore} from '$lib/stores/doc.store';
import {i18n as i18nStore} from '$lib/stores/i18n.store';
import {user as userStore} from '$lib/stores/user.store';
import type {ShareData} from '$lib/types/share';
import {emit} from '$lib/utils/events.utils';
import {i18nFormat} from '$lib/utils/i18n.utils';
import type {Doc} from '@deckdeckgo/editor';
import {get} from 'svelte/store';

export const share = async (doc?: Doc) => {
  const i18n = get(i18nStore);
  const user = get(userStore);

  const docToShare: Doc = doc || get(docStore).doc;
  const publishedUrl: string = await publishUrl(docToShare);

  const title: string | undefined = docToShare.data.meta?.title ?? i18n.share.a_blog_post;

  emit<ShareData>({
    message: 'papyShare',
    detail: {
      title,
      userName: user.name,
      userSocial: user.social,
      publishedUrl
    }
  });
};

export const getShareText = (share: ShareData): string => getCommonShareText(share);

export const getShareTwitterText = (share: ShareData): string => {
  const i18n = get(i18nStore);

  const {title, userSocial}: ShareData = share;

  if (
    !userSocial ||
    userSocial === undefined ||
    !userSocial.twitter ||
    userSocial.twitter === undefined ||
    userSocial.twitter === ''
  ) {
    return getCommonShareText(share);
  }

  return i18nFormat(i18n.share.content_by, [
    {placeholder: '{0}', value: `${title}`},
    {placeholder: '{1}', value: `@${userSocial.twitter}`},
    {placeholder: '{2}', value: `@PapyrsApp`}
  ]);
};

const getCommonShareText = (share: ShareData): string => {
  const i18n = get(i18nStore);

  const {userName, title}: ShareData = share;
  const papyrs = 'Papyrs';

  if (userName && userName !== undefined && userName !== '') {
    return i18nFormat(i18n.share.content_by, [
      {placeholder: '{0}', value: `${title}`},
      {placeholder: '{1}', value: `${userName}`},
      {placeholder: '{2}', value: `${papyrs}`}
    ]);
  }

  return i18nFormat(i18n.share.content_no_author, [
    {placeholder: '{0}', value: `${title}`},
    {placeholder: '{1}', value: `${papyrs}`}
  ]);
};
