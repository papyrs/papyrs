import {user as userStore} from '$lib/stores/user.store';
import type {StorageFile, User, UserSocial} from '@deckdeckgo/editor';
import {clearEdit} from '@deckdeckgo/offline';
import {deleteAuth, updateUser, uploadOnlineFile} from '@deckdeckgo/sync';
import {get} from 'svelte/store';

export const updateProfile = async ({
  name,
  summary,
  twitter,
  linkedin,
  github,
  custom,
  file
}: {
  name: string | undefined;
  summary: string | undefined;
  twitter: string | undefined;
  linkedin: string | undefined;
  github: string | undefined;
  custom: string | undefined;
  file: File | undefined;
}) => {
  const {user} = get(userStore);

  if (!user) {
    throw new Error('User cannot be null');
  }

  const photo_url: string | undefined = await uploadProfilePicture(file);

  const social: UserSocial = {
    ...(twitter && {twitter}),
    ...(linkedin && {linkedin}),
    ...(github && {github}),
    ...(custom && {custom})
  };

  const updateData: User = {
    ...user,
    data: {
      ...user.data,
      ...(name && {name}),
      ...(summary && {bio: summary}),
      ...(Object.keys(social).length > 0 && {social}),
      ...(photo_url && {photo_url})
    }
  };

  await updateUser(updateData);
};

const uploadProfilePicture = async (file: File | undefined): Promise<string | undefined> => {
  if (!file) {
    return undefined;
  }

  try {
    const storageFile: StorageFile | undefined = await uploadOnlineFile(file, 'avatars', 524288);

    return storageFile?.downloadUrl;
  } catch (err) {
    throw new Error(`Could not upload your profile picture! ${err}`);
  }
};

export const deleteProfile = async () => {
  await deleteAuth();

  await clearEdit(true);
};
