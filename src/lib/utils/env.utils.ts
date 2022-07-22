import type {EnvironmentCdn, EnvironmentCloud} from '@deckdeckgo/sync';
import {FEED_CANISTER_SECRET} from '../constants/constants';

export const cloud = (): boolean =>
  (import.meta.env.VITE_CLOUD_API_CDN as string | undefined) !== undefined &&
  (import.meta.env.VITE_CLOUD_SIGN_IN_CDN as string | undefined) !== undefined;

export const cloudConfig = (): EnvironmentCloud | undefined => {
  if (!cloud()) {
    return undefined;
  }

  return {
    api: {
      cdn: import.meta.env.VITE_CLOUD_API_CDN as string
    },
    signIn: {
      tag: `deckgo-ic-signin`,
      cdn: import.meta.env.VITE_CLOUD_SIGN_IN_CDN as string
    }
  };
};

export const jszipConfig = (): EnvironmentCdn | undefined => {
  const cdn: string | undefined = import.meta.env.VITE_JSZIP_CDN as string | undefined;
  return cdn ? {cdn} : undefined;
};

export const icConfig = (): Record<string, string | boolean> => {
  const managerCanisterId: string = import.meta.env.VITE_IC_MANAGER_CANISTER_ID as string;
  const kitPath: string = import.meta.env.VITE_IC_KIT_PATH as string;
  const localIdentityCanisterId: string | null | undefined = import.meta.env
    .VITE_IC_LOCAL_IDENTITY_CANISTER_ID as string | null | undefined;

  const feedCanisterId: string = import.meta.env.VITE_IC_FEED_CANISTER_ID as string;
  const feedSecret: string = FEED_CANISTER_SECRET;

  return {
    managerCanisterId,
    feedCanisterId,
    feedSecret,
    kitPath,
    author: 'Papyrs',
    ...(localIdentityCanisterId && {localIdentityCanisterId})
  };
};
