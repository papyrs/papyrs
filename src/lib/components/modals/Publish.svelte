<script lang="ts">
  import Modal from '$lib/components/ui/Modal.svelte';
  import {onDestroy, onMount} from 'svelte';
  import PublishEdit from '$lib/components/publish/PublishEdit.svelte';
  import PublishDone from '$lib/components/publish/PublishDone.svelte';
  import {snapshotDoc} from '@deckdeckgo/sync';

  let step: 'edit' | 'published' = 'edit';

  let unsubscribe: () => void | undefined;

  onMount(async () => (unsubscribe = await snapshotDoc()));
  onDestroy(() => unsubscribe?.());
</script>

<Modal on:papyClose>
  {#if step === 'edit'}
    <PublishEdit on:papyPublished={() => (step = 'published')} />
  {/if}

  {#if step === 'published'}
    <PublishDone />
  {/if}
</Modal>
