import {auth} from '$lib/stores/auth.store';
import {busy} from '$lib/stores/busy.store';
import {emit} from '$lib/utils/events.utils';
import {throwError} from '@deckdeckgo/editor';
import {clearEdit} from '@deckdeckgo/offline';
import {exportData, importData} from '@deckdeckgo/sync';
import {get} from 'svelte/store';

export const initNewDoc = async () => {
  try {
    const {loggedIn} = get(auth);

    // If the user is logged in, the data might be synced by next cron iteration. Therefore we only clean sync data if user signed out, not when a "New deck" is performed.
    await clearEdit(!loggedIn);

    emit({message: 'papyReloadEditor'});
  } catch (err) {
    throwError('Something went wrong while cleaning the local data.');
  }
};

export const importDataFile = async (file: File | undefined) => {
  if (!file) {
    return;
  }

  busy.start();

  try {
    await importData(file);

    emit({message: 'papyReloadEditor'});
  } catch (err) {
    throwError(`Something went wrong. ${err}.`);
  }

  busy.stop();
};

export const exportDataFile = async () =>
  await exportData({
    types: [
      {
        description: 'Papyrs Files',
        accept: {
          'application/octet-stream': ['.papyrs']
        }
      }
    ]
  });
