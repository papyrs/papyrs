<script lang="ts">
  import {sync} from '$lib/stores/sync.store';
  import {i18n} from '$lib/stores/i18n.store';
  import type {SvelteComponent} from 'svelte';
  import {IconCloud, IconSync, Button, Popover} from '@papyrs/ui';
  import {busy} from '$lib/stores/busy.store';

  let visible: boolean | undefined;
  let button: HTMLButtonElement | undefined;

  let label: string;
  let icon: typeof SvelteComponent;

  const syncLabel = (): string => {
    switch ($sync.sync) {
      case 'error':
        return $i18n.sync.cloud_error;
      case 'in_progress':
        return $i18n.sync.cloud_in_progress;
      case 'init':
        return $i18n.sync.cloud_pending;
      default:
        return $i18n.sync.cloud_idle;
    }
  };

  const syncIcon = (): typeof SvelteComponent => {
    if (['in_progress', 'pending', 'init'].includes($sync.sync)) {
      return IconSync;
    }

    return IconCloud;
  };

  const showLog = () => {
    busy.show();

    visible = false;
  };

  $: $sync.sync, (label = syncLabel()), (icon = syncIcon());
</script>

<Button on:click={() => (visible = true)} bind:button>
  <div slot="icon" class="icon">
    <svelte:component this={icon} />
  </div>
  {$i18n.sync.cloud}
</Button>

<Popover bind:visible anchor={button} direction="rtl">
  <div class="info">
    <h2>{$i18n.sync.status}</h2>
    <p>{$i18n.sync.info}</p>
    <p>{@html label}</p>

    <button type="button" on:click|stopPropagation={showLog}> Log </button>
  </div>
</Popover>

<style lang="scss">
  @use '@papyrs/ui/styles/mixins/overlay';

  .icon {
    display: contents;
  }

  .error {
    color: var(--color-error);
  }

  .info {
    @include overlay.content;
  }
</style>
