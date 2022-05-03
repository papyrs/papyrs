<script lang="ts">
  import {docs as syncDocs} from '@deckdeckgo/sync';
  import type {Doc} from '@deckdeckgo/editor';
  import {onMount} from 'svelte';
  import {auth} from '$lib/stores/auth.store';
  import Spinner from '$lib/components/ui/Spinner.svelte';
  import Post from '$lib/components/posts/Post.svelte';
  import {toasts} from '$lib/stores/toasts.store';
  import {i18n} from '$lib/stores/i18n.store';

  let docs: Doc[] = [];
  let loading = true;

  onMount(async () => {
    if (!$auth.authUser) {
      return;
    }

    try {
      docs = await syncDocs($auth.authUser.uid);
    } catch (err) {
      toasts.error({
        text: 'Something went wrong while fetching the posts.',
        detail: err
      });
    }

    loading = false;
  });

  const filterDoc = ({detail}: CustomEvent<Doc>) =>
    (docs = docs.filter(({id}: Doc) => id !== detail.id));

  let empty;
  $: empty = docs.length === 0;
</script>

{#if loading}
  <Spinner />
{:else if empty}
  <section>
    <h1>{$i18n.menu.documents}</h1>
    <p>{$i18n.editor.your_collection_empty}</p>
  </section>
{:else}
  <section class="grid">
    {#each docs as doc}
      <Post {doc} on:papyDocDeleted={filterDoc} />
    {/each}
  </section>
{/if}

<style lang="scss">
  @use '../../themes/mixins/grid';

  .grid {
    @include grid.posts;
  }
</style>
