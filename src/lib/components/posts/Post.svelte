<script lang="ts">
  import type {Doc} from '@deckdeckgo/editor';
  import {goto} from '$app/navigation';
  import {formatDate} from '@deckdeckgo/editor';
  import {loadAndImportDoc} from '@deckdeckgo/sync';
  import PostDelete from '$lib/components/posts/PostDelete.svelte';
  import {getEdit} from '@deckdeckgo/offline';
  import type {Editor} from '@deckdeckgo/offline';
  import {onMount} from 'svelte';
  import SharePost from '$lib/components/posts/SharePost.svelte';
  import {busy} from '$lib/stores/busy.store';
  import {toasts} from '$lib/stores/toasts.store';
  import {i18n} from '$lib/stores/i18n.store';
  import PostNoDelete from './PostNoDelete.svelte';

  export let doc: Doc;

  let deleteDoc = false;
  let shareDoc: boolean;

  onMount(async () => {
    const editor: Editor | undefined = await getEdit();
    deleteDoc = editor !== undefined && doc.id !== editor.id;
  });

  const navigateDoc = async (doc: Doc) => {
    busy.start();

    try {
      await loadAndImportDoc(doc);

      await goto('/', {replaceState: true});
    } catch (err) {
      toasts.error({
        text: 'Something went wrong while loading the post.',
        detail: err
      });
    }

    busy.stop();
  };

  $: shareDoc = doc.data.meta?.published ?? false;
</script>

<article role="button" on:click={async () => await navigateDoc(doc)} class:active={!deleteDoc}>
  <div class="info">
    <h3>{doc.data.name}</h3>

    <p>{$i18n.dashboard.edited}: {formatDate(doc.data.updated_at)}</p>

    {#if doc.data.meta !== undefined}
      <p>{$i18n.dashboard.published}: {formatDate(doc.data.meta.published_at)}</p>
    {/if}
  </div>

  <div class="toolbar">
    {#if shareDoc}
      <SharePost {doc} />
    {/if}

    {#if deleteDoc}
      <PostDelete {doc} on:papyDocDeleted />
    {:else}
      <PostNoDelete />
    {/if}
  </div>
</article>

<style lang="scss">
  @use '@papyrs/ui/styles/mixins/card';

  article {
    @include card.card(true);
  }

  .active {
    box-shadow: 3px 3px var(--color-secondary);
    border: 2px solid var(--color-secondary);
  }
</style>
