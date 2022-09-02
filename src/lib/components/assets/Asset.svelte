<script lang="ts">
  import type {StorageFile} from '@deckdeckgo/editor';
  import AssetDelete from '$lib/components/assets/AssetDelete.svelte';
  import AssetImg from '$lib/components/assets/AssetImg.svelte';
  import {auth} from '../../stores/auth.store';

  export let item: StorageFile;
  export let folder: 'data' | 'images';
  export let deleteAsset = true;

  let name: string;

  $: ({name} = item);
</script>

<article role="button" on:click>
  {#if folder === 'images'}
    <AssetImg img={item} />
  {/if}

  <!-- TODO: data the day there are data-->

  <aside class:block={!deleteAsset}>
    <p>{name}</p>

    {#if $auth.loggedIn && deleteAsset}
      <AssetDelete {item} on:papyAssetDeleted />
    {/if}
  </aside>
</article>

<style lang="scss">
  @use '@papyrs/ui/styles/mixins/text';
  @use '@papyrs/ui/styles/mixins/interaction';

  article {
    @include interaction.tappable;
  }

  aside {
    display: grid;
    grid-template-columns: 70% 30%;
    align-items: center;

    margin: 0 0.45rem;

    &.block {
      display: block;
    }
  }

  p {
    font-size: var(--font-size-very-small);
    margin: 0;
    @include text.clamp(2);
  }
</style>
