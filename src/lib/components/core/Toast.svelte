<script lang="ts">
  import {toasts} from '$lib/stores/toasts.store';
  import {fade, fly} from 'svelte/transition';
  import type {ToastLevel, ToastMsg} from '$lib/types/toast';
  import IconClose from '$lib/components/icons/IconClose.svelte';
  import {i18n} from '$lib/stores/i18n.store';

  export let msg: ToastMsg;

  const close = () => toasts.hide();

  let text: string;
  let level: ToastLevel;
  let detail: string | undefined;

  $: ({text, level, detail} = msg);
</script>

<div
  role="dialog"
  class="toast"
  class:error={level === 'error'}
  class:warn={level === 'warn'}
  in:fly={{y: 100, duration: 200}}
  out:fade={{delay: 100}}>
  <p title={text}>
    {text}{detail ? ` ${detail}` : ''}
  </p>

  <button class="text" on:click={close} aria-label={$i18n.core.close}><IconClose /></button>
</div>

<style lang="scss">
  @use '../../themes/mixins/text';
  @use '../../themes/mixins/shadow';

  .toast {
    display: flex;
    justify-content: space-between;
    align-items: center;

    position: fixed;
    bottom: calc(2 * var(--padding));
    left: 50%;
    transform: translate(-50%, 0);

    @include shadow.shadow;

    background: white;
    color: black;

    width: calc(100% - (8 * var(--padding)));

    padding: var(--padding) calc(var(--padding) * 2);
    box-sizing: border-box;

    z-index: calc(var(--z-index) + 999);

    @media (min-width: 768px) {
      max-width: var(--section-max-width);
    }

    &.error {
      background: var(--color-error);
      color: var(--color-error-contrast);
    }

    &.warn {
      background: var(--color-primary);
      color: var(--color-primary-contrast);
    }
  }

  p {
    @include text.clamp(4);

    margin: 0;
    font-size: 1rem;

    @media (min-width: 768px) {
      @include text.clamp(2);
    }
  }
</style>
