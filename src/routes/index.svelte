<script lang="ts">
  import Editor from '$lib/components/editor/Editor.svelte';
  import {onDestroy, onMount} from 'svelte';
  import type {SyncEvent} from '@deckdeckgo/editor';
  import Toolbar from '$lib/components/toolbar/Toolbar.svelte';
  import {sync, initSyncState} from '@deckdeckgo/sync';
  import Modals from '$lib/components/modals/Modals.svelte';

  let syncWorker: Worker | undefined = undefined;

  onMount(async () => {
    const SyncWorker = await import('$lib/workers/sync.worker?worker');
    syncWorker = new SyncWorker.default();
    syncWorker.postMessage({msg: 'startSyncTimer'});

    syncWorker.onmessage = async ({data}: MessageEvent<SyncEvent>) => {
      if (!data || data.msg !== 'deckdeckgo_sync') {
        return;
      }

      await sync(data.data);
    };

    await initSyncState();
  });

  onDestroy(() => syncWorker?.postMessage({msg: 'stopSyncTimer'}));
</script>

<Toolbar />

<Editor />

<Modals />
