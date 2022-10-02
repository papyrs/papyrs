<script lang="ts">
  import type {StorageFile} from '@deckdeckgo/editor';
  import Delete from '$lib/components/core/Delete.svelte';
  import {createEventDispatcher} from 'svelte';
  import {deleteFile} from '@deckdeckgo/sync';
  import {busy} from '$lib/stores/busy.store';
  import {toastsError} from '$lib/stores/toasts.store';

  export let item: StorageFile;

  const dispatch = createEventDispatcher();

  let visible = false;
  let deleting = false;

  const deleteItem = async () => {
    deleting = true;

    busy.start();

    try {
      visible = false;

      await deleteFile(item);

      dispatch('papyAssetDeleted', item);
    } catch (err) {
      toastsError({
        text: 'Something went wrong while deleting the asset.',
        detail: err
      });
    }

    deleting = false;

    busy.stop();
  };
</script>

<Delete {deleting} bind:visible on:papyDelete={async () => await deleteItem()} />
