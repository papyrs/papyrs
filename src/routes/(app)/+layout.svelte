<script lang="ts">
  import '../../lib/themes/monaco.scss';
  import '../../lib/themes/print.scss';

  import {onDestroy, onMount} from 'svelte';
  import {initSync} from '@deckdeckgo/sync';
  import {cloudConfig, jszipConfig} from '$lib/utils/env.utils';
  import type {Log} from '@deckdeckgo/editor';
  import {logs} from '$lib/stores/logs.store';
  import {idleSignOut, initAuth} from '$lib/services/auth.services';
  import {Toasts} from '@papyrs/ui';
  import Share from '$lib/components/share/Share.svelte';
  import Busy from '$lib/components/core/Busy.svelte';
  import {i18n} from '$lib/stores/i18n.store';

  let destroyListener: (() => void)[] | undefined = undefined;

  onMount(async () => {
    destroyListener = initSync({
      env: {
        cloud: cloudConfig(),
        jszip: jszipConfig()
      }
    });

    await initAuth();
  });

  onDestroy(() => destroyListener?.forEach((unsubscribe: () => void) => unsubscribe()));

  const onDdgLog = ({detail}: CustomEvent<Log>) => ($logs = [...$logs, detail].slice(-100));
</script>

<svelte:window on:ddgLog={onDdgLog} on:ddgSignOut={idleSignOut} />

{#await i18n.init() then}
  <slot />

  <Share />
  <Busy />
  <Toasts />
{/await}

<style lang="scss" global>
  @use '../../../node_modules/@papyrs/ui/styles/mixins/main';

  @import '@papyrs/ui/styles/global.scss';

  :root {
    @include main.layout;
  }
</style>
