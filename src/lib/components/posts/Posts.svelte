<script lang="ts">
  import {docs as syncDocs} from '@deckdeckgo/sync';
  import type {Doc} from '@deckdeckgo/editor';
  import {onMount} from 'svelte';
  import {auth} from '$lib/stores/auth.store';
  import {Spinner} from '@papyrs/ui';
  import Post from '$lib/components/posts/Post.svelte';
  import {toastsError} from '$lib/stores/toasts.store';
  import {i18n} from '$lib/stores/i18n.store';
  import {toDate} from '@deckdeckgo/editor';

  let docs: Doc[] = [];
  let loading = true;

  onMount(async () => {
    if (!$auth.authUser) {
      return;
    }

    try {
      const entries: Doc[] = await syncDocs($auth.authUser.uid);
      docs = [
        ...entries.sort(
          ({data: {created_at: created_at_a}}: Doc, {data: {created_at: created_at_b}}: Doc) =>
            (toDate(created_at_b)?.getTime() ?? 0) - (toDate(created_at_a)?.getTime() ?? 0)
        )
      ];
    } catch (err) {
      toastsError({
        text: 'Something went wrong while fetching the posts.',
        detail: err
      });
    }

    loading = false;
  });

  const filterDoc = ({detail}: CustomEvent<Doc>) =>
    (docs = docs.filter(({id}: Doc) => id !== detail.id));

  let empty: boolean;
  $: empty = docs.length === 0;
</script>

{#if loading}
  <Spinner />
{:else if empty}
  <section>
    <h1>{$i18n.menu.posts}</h1>
    <p>{$i18n.editor.your_collection_empty}</p>
  </section>
{:else}
  <section class="grid">
    {#each docs as doc (doc.id)}
      <Post {doc} on:papyDocDeleted={filterDoc} />
    {/each}
  </section>
{/if}

<style lang="scss">
  @use '@papyrs/ui/styles/mixins/grid';

  .grid {
    @include grid.posts;
  }
</style>
