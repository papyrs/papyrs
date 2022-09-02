<script lang="ts">
  import type {UnsplashPhoto, UnsplashUser} from '@deckdeckgo/editor';
  import type {Image} from '$lib/types/image';
  import {isUnsplash} from '$lib/utils/assets.utils';

  export let asset: Image;

  let user: UnsplashUser | undefined;

  $: ({user} = isUnsplash(asset) ? (asset as UnsplashPhoto) : {user: undefined});
</script>

{#if user !== undefined}
  <a
    href={user.links.html + '?utm_source=Papyrs&utm_medium=referral'}
    target="_blank"
    rel="noopener noreferrer external"
    on:click|stopPropagation>
    {user.name}
  </a>
{/if}

<style lang="scss">
  @use '@papyrs/ui/styles/mixins/text';

  a {
    display: inline-flex;
    justify-content: center;

    width: 100%;
    max-width: 100%;

    font-size: calc(var(--font-size-very-small) * 0.8);

    @include text.truncate;
  }
</style>
