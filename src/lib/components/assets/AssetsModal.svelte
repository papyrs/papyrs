<script lang="ts">
  import Modal from '$lib/components/ui/Modal.svelte';
  import {createEventDispatcher, onDestroy, onMount} from 'svelte';
  import {emit} from '$lib/utils/events.utils';
  import {debounce} from '$lib/utils/input.utils';
  import InfiniteContent from '$lib/components/ui/InfiniteContent.svelte';
  import AssetImg from '$lib/components/assets/AssetImg.svelte';
  import AssetCredits from '$lib/components/assets/AssetCredits.svelte';
  import SearchField from '$lib/components/ui/SearchField.svelte';
  import type {Image} from '$lib/types/image';
  import type {AssetsSearchParams, AssetsSearchResults} from '$lib/types/assets';
  import {toasts} from '$lib/stores/toasts.store';
  import {ImageLoadEvents} from '@deckdeckgo/sync';

  export let search: (params: AssetsSearchParams) => Promise<AssetsSearchResults>;
  export let registerDownload: (asset: Image) => Promise<void>;

  const dispatch = createEventDispatcher();

  let searchDisabled = false;

  const debounceSearch: () => void = debounce(async () => {
    if (searchDisabled) {
      return;
    }

    try {
      const {
        results,
        next: nextStep,
        end
      }: AssetsSearchResults | undefined = await search({
        searchTerm: searchTerm ?? '',
        next
      });

      assets = [...assets, ...results];

      searchDisabled = end;
      next = nextStep;
    } catch (err) {
      toasts.error({
        text: 'Something went wrong while searching.',
        detail: err
      });
    }
  }, 250);

  const resetSearch = () => {
    next = 1;
    searchDisabled = false;
    assets = [];

    if (searchTerm === '' || searchTerm == undefined) {
      return;
    }

    debounceSearch();
  };

  let input: HTMLInputElement | undefined = undefined;
  let searchTerm: string | undefined = undefined;
  let next = 1;
  let assets: Image[] = [];

  $: searchTerm, resetSearch();

  const emitImg = (image: Image | undefined) =>
    emit<Image | undefined>({message: 'papySaveImg', detail: image});

  const selectAsset = async (asset: Image) => {
    await registerDownload(asset);

    emitImg(asset);
    dispatch('papyClose');
  };

  const close = async () => {
    emitImg(undefined);
    dispatch('papyClose');
  };

  const imageLoadEvents: ImageLoadEvents = new ImageLoadEvents();

  onMount(() => imageLoadEvents.init());
  onDestroy(() => imageLoadEvents.destroy());
</script>

<Modal on:papyClose={async () => await close()} on:introend={() => input?.focus()}>
  <span slot="title">
    <slot name="title" />
  </span>

  <InfiniteContent on:papyIntersect={debounceSearch}>
    {#each assets as asset}
      <article on:click|stopPropagation={async () => await selectAsset(asset)}>
        <AssetImg img={asset} />

        <AssetCredits {asset} />
      </article>
    {/each}
  </InfiniteContent>

  <SearchField bind:input bind:searchTerm slot="stickyFooter" />
</Modal>

<style lang="scss">
  @use '../../themes/mixins/interaction';

  article {
    position: relative;

    @include interaction.tappable;

    margin: 0.75rem 0;
  }
</style>
