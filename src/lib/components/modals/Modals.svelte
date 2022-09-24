<script lang="ts">
  import {cloud} from '$lib/utils/env.utils';
  import Publish from '$lib/components/modals/Publish.svelte';
  import {auth} from '$lib/stores/auth.store';
  import {goto} from '$app/navigation';
  import Code from '$lib/components/modals/Code.svelte';
  import Unsplash from '$lib/components/modals/Unsplash.svelte';
  import Tenor from '$lib/components/modals/Tenor.svelte';
  import {toastsError} from '$lib/stores/toasts.store';
  import type {PapyModal} from '$lib/types/modal';
  import Images from './Images.svelte';
  import Excalidraw from './Excalidraw.svelte';

  let modal: PapyModal | undefined = undefined;

  const publishAction = async () => {
    if (!cloud()) {
      toastsError({
        text: 'No cloud configured. Cannot publish.'
      });
      return;
    }

    if (!$auth.authUser) {
      await goto('/signin');
      return;
    }

    modal = {type: 'publish'};
  };

  const close = () => (modal = undefined);
</script>

<svelte:window on:papyPublish={publishAction} on:papyModal={({detail}) => (modal = detail)} />

{#if modal?.type === 'publish'}
  <Publish on:papyClose={close} />
{/if}

{#if modal?.type === 'code'}
  <Code on:papyClose={close} detail={modal.detail} />
{/if}

{#if modal?.type === 'unsplash'}
  <Unsplash on:papyClose={close} />
{/if}

{#if modal?.type === 'tenor'}
  <Tenor on:papyClose={close} />
{/if}

{#if modal?.type === 'storage'}
  <Images on:papyClose={close} />
{/if}

{#if modal?.type === 'excalidraw'}
  <Excalidraw on:papyClose={close} detail={modal.detail} />
{/if}
