<script lang="ts">
  import {getFiles, ImageLoadEvents} from '@deckdeckgo/sync';
  import type {StorageFile, StorageFilesList} from '@deckdeckgo/editor';
  import {createEventDispatcher, onDestroy, onMount} from 'svelte';
  import {auth} from '$lib/stores/auth.store';
  import type {AuthStore} from '$lib/stores/auth.store';
  import {Spinner} from '@papyrs/ui';
  import Asset from '$lib/components/assets/Asset.svelte';
  import type {Unsubscriber} from 'svelte/store';
  import {toastsError} from '$lib/stores/toasts.store';
  import {i18n} from '$lib/stores/i18n.store';

  export let listOfflineFiles = false;
  export let deleteAsset = true;

  let items: StorageFile[] = [];
  let loading = true;

  let folder: 'data' | 'images' = 'images';

  const init = async () => {
    // Load only once
    if (!loading) {
      return;
    }

    try {
      const list: StorageFilesList | null = await getFiles({next: null, folder});
      items = list?.items || [];
    } catch (err) {
      toastsError({
        text: 'Something went wrong while fetching the assets.',
        detail: err
      });
    }

    loading = false;
  };

  const unsubscribe: Unsubscriber = auth.subscribe(async ({loggedIn}: AuthStore) => {
    if (!loggedIn) {
      if (listOfflineFiles) {
        await init();
      }

      return;
    }

    await init();
  });

  const filterItems = ({detail}: CustomEvent<StorageFile>) =>
    (items = items.filter(({fullPath}: StorageFile) => fullPath !== detail.fullPath));

  const dispatch = createEventDispatcher();
  const selectAsset = (item: StorageFile) => dispatch('papySelectAsset', item);

  const imageLoadEvents: ImageLoadEvents = new ImageLoadEvents();

  onMount(() => imageLoadEvents.init());

  onDestroy(() => {
    unsubscribe();

    imageLoadEvents.destroy();
  });

  let empty: boolean;
  $: empty = items.length === 0;
</script>

{#if loading}
  <Spinner />
{:else if empty}
  <section>
    <slot name="title" />
    <p>{$i18n.editor.your_collection_empty}</p>
  </section>
{:else}
  <section class="grid">
    {#each items as item}
      <Asset
        {item}
        {folder}
        {deleteAsset}
        on:papyAssetDeleted={filterItems}
        on:click={() => selectAsset(item)} />
    {/each}
  </section>
{/if}

<style lang="scss">
  @use '@papyrs/ui/styles/mixins/grid';

  .grid {
    @include grid.images;
  }
</style>
