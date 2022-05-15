<script lang="ts">
  import type {Doc} from '@deckdeckgo/editor';
  import {deleteDeckOrDoc} from '@deckdeckgo/sync';
  import {createEventDispatcher} from 'svelte';
  import Delete from '$lib/components/core/Delete.svelte';
  import {busy} from '$lib/stores/busy.store';
  import {toasts} from '$lib/stores/toasts.store';

  export let doc: Doc;

  let visible = false;

  let deleting = false;

  const dispatch = createEventDispatcher();

  const deleteDoc = async () => {
    deleting = true;

    busy.start();

    try {
      visible = false;

      await deleteDeckOrDoc({data: {doc}, deleteStorage: true});

      dispatch('papyDocDeleted', doc);
    } catch (err) {
      toasts.error({
        text: 'Something went wrong while deleting the asset.',
        detail: err
      });
    }

    deleting = false;

    busy.stop();
  };
</script>

<Delete {deleting} bind:visible on:papyDelete={async () => await deleteDoc()} />
