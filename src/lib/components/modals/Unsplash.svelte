<script lang="ts">
  import AssetsModal from '$lib/components/assets/AssetsModal.svelte';
  import type {UnsplashPhoto, UnsplashSearchResponse} from '@deckdeckgo/editor';
  import {registerUnsplashDownload, searchUnsplash} from '$lib/services/unsplash.services';
  import type {Image} from '$lib/types/image';
  import {i18n} from '$lib/stores/i18n.store';
  import type {AssetsSearchParams, AssetsSearchResults} from '$lib/types/assets';

  const search = async ({searchTerm, next}: AssetsSearchParams): Promise<AssetsSearchResults> => {
    const {results, total}: UnsplashSearchResponse = await searchUnsplash({
      searchTerm: searchTerm ?? '',
      next
    });

    return {
      results,
      end: (next + 1) * 10 >= total,
      next: next + 1
    };
  };

  const registerDownload = async (asset: Image): Promise<void> => {
    await registerUnsplashDownload(asset as UnsplashPhoto);
  }
</script>

<AssetsModal {search} {registerDownload} on:papyClose>
  <svelte:fragment slot="title">{$i18n.editor.stock_photo}</svelte:fragment>
</AssetsModal>
