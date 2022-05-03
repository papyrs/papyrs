import {toasts} from '$lib/stores/toasts.store';
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

export const signUserOut = async () => {
  await signOut();

  await clearEdit(true);

  // reset log history
  logs.set([]);

  emit({message: 'papySignOut'});
};

export const idleSignOut = async () => {
  await signUserOut();

  toasts.show({
    text: 'You have been logged out because your session has expired. Sign-in to renew your identity.',
    level: 'warn'
  });
};

export const initAuth = async () => {
  try {
    await initAuthSync(icConfig());
  } catch (err: unknown) {
    toasts.error({
      text: 'Something went wrong while initializing the authentication.',
      detail: err
    });
  }
};

export const getPrincipal = async (): Promise<Principal | undefined> => {
  const {getIdentity} = await cloudProvider();

  const identity = await getIdentity();
  return identity?.getPrincipal();
};
