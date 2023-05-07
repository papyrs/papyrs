import {toastsError, toastsShow} from '$lib/stores/toasts.store';
import {cloud, cloudConfig, icConfig} from '$lib/utils/env.utils';
import {injectJS} from '@deckdeckgo/editor';
import {clearEdit} from '@deckdeckgo/offline';
import {initAuth as initAuthSync, signOut} from '@deckdeckgo/sync';
import {logs} from '../stores/logs.store';
import type {Principal} from '../types/ic';
import {emit} from '../utils/events.utils';
import {cloudProvider} from '../utils/providers.utils';

export const loadSignIn = async () => {
  if (!cloud()) {
    return;
  }

  const {signIn} = cloudConfig();
  const {tag, cdn} = signIn;

  await injectJS({
    id: tag,
    src: cdn,
    module: true
  });
};

/**
 * If user explicitly sign out, we assume the user want to stop editing and therefore the data can be cleaned.
 * If the delegation expires, user might be still editing the post therefore we do not clean the data but only sign out and display a warning
 * @param clearLocalEdit clear local edited data
 */
export const signUserOut = async ({clearLocalEdit}: {clearLocalEdit: boolean}) => {
  await signOut();

  if (clearLocalEdit) {
    await clearEdit(true);
  }

  // reset log history
  logs.set([]);

  emit({message: 'papySignOut'});
};

export const idleSignOut = async () => {
  await signUserOut({clearLocalEdit: false});

  toastsShow({
    text: 'You have been logged out because your session has expired. Sign-in to renew your identity.',
    level: 'warn'
  });
};

export const initUserError = async ({detail: err}: CustomEvent<Error>) => {
  await signUserOut({clearLocalEdit: false});

  toastsError({
    text: 'Cannot initialize the user.',
    detail: err
  });
};

export const initAuth = async () => {
  try {
    await initAuthSync(icConfig());
  } catch (err: unknown) {
    toastsError({
      text: 'Something went wrong while initializing the authentication.',
      detail: err
    });
  }
};

export const getPrincipal = async (): Promise<Principal | undefined> => {
  const {getIdentity} = await cloudProvider<{
    getIdentity: () => Promise<{getPrincipal: () => Principal | undefined}>;
  }>();

  const identity = await getIdentity();
  return identity?.getPrincipal();
};
