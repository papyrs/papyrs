<script lang="ts">
  import '$lib/themes/font-faces.scss';
  import '$lib/themes/fonts.scss';
  import '$lib/themes/theme.scss';
  import '$lib/themes/main.scss';
  import '$lib/themes/body.scss';
  import '$lib/themes/button.scss';
  import '$lib/themes/link.scss';
  import '$lib/themes/input.scss';
  import '$lib/themes/monaco.scss';
  import '$lib/themes/img.scss';
  import '$lib/themes/print.scss';
  import '$lib/themes/variables.scss';

  import {onDestroy, onMount} from 'svelte';
  import {initSync} from '@deckdeckgo/sync';
  import {cloudConfig, jszipConfig} from '$lib/utils/env.utils';
  import type {Log} from '@deckdeckgo/editor';
  import {logs} from '$lib/stores/logs.store';
  import {idleSignOut, initAuth} from '$lib/services/auth.services';
  import Toasts from '$lib/components/core/Toasts.svelte';
  import Share from '$lib/components/share/Share.svelte';
  import Busy from '$lib/components/core/Busy.svelte';

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

<slot />

<Share />
<Busy />
<Toasts />
