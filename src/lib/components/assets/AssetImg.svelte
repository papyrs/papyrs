<script lang="ts">
  import type {Image} from '$lib/types/image';
  import type {StorageFile, TenorGif, UnsplashPhoto} from '@deckdeckgo/editor';
  import {isTenor, isUnsplash} from '$lib/utils/assets.utils';

  export let img: Image;

  let src: string | undefined = undefined;
  let alt: string;

  const init = () => {
    if (isUnsplash(img)) {
      initUnsplash();
      return;
    }

    if (isTenor(img)) {
      initTenor();
      return;
    }

    initStorage();
  };

  const initUnsplash = () => {
    const {urls, description}: UnsplashPhoto = img as UnsplashPhoto;

    src = urls?.thumb;
    alt = description || 'Unsplash';
  };

  const initTenor = () => {
    const {media, title}: TenorGif = img as TenorGif;

    src = media?.[0]?.tinygif?.url;
    alt = title || 'GIF';
  };

  const initStorage = () => {
    const {downloadUrl, name}: StorageFile = img as StorageFile;

    src = downloadUrl;
    alt = name;
  };

  $: img, init();
</script>

{#if src !== undefined}
  <deckgo-lazy-img img-src={src} img-alt={alt} custom-loader={true} />
{/if}

{#if src === undefined}
  <div class="placeholder" />
{/if}

<style lang="scss">
  @use '@papyrs/ui/styles/mixins/shadow';

  deckgo-lazy-img,
  .placeholder {
    @include shadow.strong;

    min-width: 100%;
  }

  deckgo-lazy-img {
    min-height: 0.45rem;
  }

  .placeholder {
    min-height: 2.45rem;
  }
</style>
