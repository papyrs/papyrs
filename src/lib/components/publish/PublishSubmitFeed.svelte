<script lang="ts">
  import Checkbox from '../ui/Checkbox.svelte';
  import {i18n} from '../../stores/i18n.store';
  import {fade} from 'svelte/transition';

  export let submitFeed: boolean;
  export let disabled = false;

  let visible = false;
</script>

<div class:closed={!visible}>
  <Checkbox bind:checked={submitFeed} checkboxId="submitFeed" {disabled}>
    {#if disabled}
      {$i18n.publish_edit.submit_feed_done}
    {:else}
      {$i18n.publish_edit.submit_feed}
    {/if}
  </Checkbox>

  {#if !disabled}
    <button class="text" role="button" on:click|preventDefault={() => (visible = !visible)}
      >[i]</button>
  {/if}
</div>

{#if visible}
  <p transition:fade>
    {$i18n.publish_edit.submit_feed_info}
  </p>
{/if}

<style lang="scss">
  @use '../../themes/mixins/overlay';

  div,
  p {
    grid-column-start: 1;
    grid-column-end: 3;
    justify-self: center;
  }

  div {
    display: flex;
    align-items: center;

    margin: 0 0 var(--padding);
  }

  .closed {
    margin: 0 0 1rem;
  }

  p {
    font-size: var(--font-size-very-small);
    padding: 0.45rem;
  }

  button {
    margin: 0 var(--padding);
    padding: 0;
    font-size: var(--font-size-very-small);
  }
</style>
