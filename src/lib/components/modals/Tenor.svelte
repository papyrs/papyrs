<script lang="ts">
  import AssetsModal from '$lib/components/assets/AssetsModal.svelte';
  import type {Image} from '$lib/types/image';
  import {i18n} from '$lib/stores/i18n.store';
  import type {AssetsSearchParams, AssetsSearchResults} from '$lib/types/assets';
  import {registerGif, searchGifs} from '$lib/services/tenor.services';
  import type {TenorGif, TenorSearchResponse} from '@deckdeckgo/editor';

  const search = async ({searchTerm, next}: AssetsSearchParams): Promise<AssetsSearchResults> => {
    const {results, next: nextStep}: TenorSearchResponse | undefined = await searchGifs({
      searchTerm: searchTerm ?? '',
      next
    });

    return {
      results,
      end: results.length === 0,
      next: parseInt(nextStep as string)
    };
  };

  const registerDownload = async (asset: Image) => await registerGif((asset as TenorGif).id);
</script>

<AssetsModal {search} {registerDownload} on:papyClose>
  <svelte:fragment slot="title">{$i18n.editor.gifs}</svelte:fragment>
</AssetsModal>
