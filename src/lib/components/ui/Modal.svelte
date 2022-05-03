<script lang="ts">
  import {fade, scale} from 'svelte/transition';
  import {quintOut} from 'svelte/easing';
  import {i18n} from '$lib/stores/i18n.store';
  import IconClose from '$lib/components/icons/IconClose.svelte';
  import {createEventDispatcher} from 'svelte';

  let visible = true;

  const dispatch = createEventDispatcher();

  const close = () => {
    visible = false;
    dispatch('papyClose');
  };

  const footer: boolean = $$slots.footer ?? false;
</script>

{#if visible}
  <div
    class="modal"
    transition:fade
    role="dialog"
    aria-labelledby="modalTitle"
    aria-describedby="modalContent"
    on:introend>
    <div class="backdrop" on:click|stopPropagation={close} />
    <div transition:scale={{delay: 25, duration: 150, easing: quintOut}} class="wrapper">
      <div class="toolbar">
        <h3 id="modalTitle"><slot name="title" /></h3>
        <button on:click|stopPropagation={close} aria-label={$i18n.core.close}
          ><IconClose /></button>
      </div>

      <div class="content" id="modalContent">
        <slot />
      </div>

      {#if footer}
        <footer>
          <slot name="footer" />
        </footer>
      {/if}
    </div>
  </div>
{/if}

<style lang="scss">
  @use '../../themes/mixins/interaction';
  @use '../../themes/mixins/section';
  @use '../../themes/mixins/overlay';
  @use '../../themes/mixins/shadow';

  .modal {
    position: fixed;
    inset: 0;

    z-index: calc(var(--z-index) + 998);
  }

  .backdrop {
    position: absolute;
    inset: 0;

    @include overlay.backdrop('dark');

    @include interaction.tappable;
  }

  .wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    @include section.large;
    height: calc(min(100vh, 796px) - 2.75rem);
    max-height: -webkit-fill-available;

    @include shadow.strong;

    overflow: hidden;
  }

  .toolbar {
    display: grid;
    grid-template-columns: 65px 1fr 65px;
    align-items: center;

    h3 {
      grid-column-start: 2;
      text-align: center;
      margin-bottom: 0;
    }

    button {
      grid-column-start: 3;
      margin: 0.45rem;
    }
  }

  .content {
    position: relative;

    padding: 0 2.45rem;

    overflow: scroll;
    height: calc(100% - 60px);
    max-height: calc(100% - 60px);

    :global(section) {
      max-width: 100%;
    }
  }

  footer {
    position: absolute;
    inset: auto 0 0;

    display: flex;
    justify-content: center;

    padding: 0.75rem 2.25rem;

    background: rgba(var(--color-primary-rgb), 0.8);
  }
</style>
