<script lang="ts">
  import Nav from '$lib/components/core/Nav.svelte';
  import {auth} from '$lib/stores/auth.store';
  import {i18n} from '$lib/stores/i18n.store';
  import SignIn from '$lib/components/core/SignIn.svelte';
  import Assets from '$lib/components/assets/Assets.svelte';
  import type {StorageFile} from '@deckdeckgo/editor';

  const openAsset = ({detail}: CustomEvent<StorageFile>) => {
    const {downloadUrl} = detail;
    window.open(downloadUrl, '_blank', 'noopener,noreferrer');
  };
</script>

<Nav />

<main>
  {#if !$auth.authUser}
    <SignIn text={$i18n.settings.access_assets} />
  {:else}
    <Assets on:papySelectAsset={openAsset}>
      <h1 slot="title">{$i18n.menu.assets}</h1>
    </Assets>
  {/if}
</main>
