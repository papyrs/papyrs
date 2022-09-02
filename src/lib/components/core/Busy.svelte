<script lang="ts">
  import {fade} from 'svelte/transition';
  import {busy} from '$lib/stores/busy.store';
  import {Spinner} from '@papyrs/ui';
  import Log from '$lib/components/core/Log.svelte';
  import {i18n} from '$lib/stores/i18n.store';
  import {IconClose} from '@papyrs/ui';
  import Version from './Version.svelte';

  let visible: boolean;
  $: visible = $busy !== undefined;

  const close = () => busy.stop();
</script>

{#if visible}
  <div transition:fade>
    {#if $busy.close}
      <div class="backdrop" on:click={close} />
    {/if}

    <div class="content">
      {#if $busy.close}
        <button on:click|stopPropagation={close} aria-label={$i18n.core.close} class="text close"
          ><IconClose /></button>
      {/if}

      {#if $busy.log}
        <Log />
      {/if}

      {#if $busy.log && !$busy.spinner}
        <Version />
      {/if}

      {#if $busy.spinner}
        <div class="spinner">
          <Spinner />
        </div>
      {/if}
    </div>
  </div>
{/if}

<style lang="scss">
  @use '@papyrs/ui/styles/mixins/interaction';
  @use '@papyrs/ui/styles/mixins/overlay';

  div {
    z-index: calc(var(--z-index) + 1000);

    position: fixed;
    inset: 0;

    @include overlay.backdrop('dark');
  }

  .backdrop {
    position: absolute;
    inset: 0;

    background: transparent;

    @include interaction.tappable;
  }

  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    width: fit-content;

    background: transparent;
  }

  .spinner {
    position: relative;
    height: 30px;
    margin: 1.45rem;
    --spinner-color: white;
  }

  .close {
    align-self: flex-end;
  }

  .text {
    color: white;
  }
</style>
