<script lang="ts">
  import {i18n} from '$lib/stores/i18n.store';
  import Popover from '$lib/components/ui/Popover.svelte';
  import IconDelete from '$lib/components/icons/IconDelete.svelte';
  import {createEventDispatcher} from 'svelte';

  export let visible = false;
  export let deleting: boolean;

  const dispatch = createEventDispatcher();
</script>

<button
  class="icon"
  type="button"
  on:click|stopPropagation={() => (visible = true)}
  aria-label={$i18n.core.delete}>
  <IconDelete />
</button>

<Popover bind:visible center={true}>
  <div class="content">
    <h3>{$i18n.editor.delete_question}</h3>

    <p>
      {$i18n.editor.action_cannot_undone}
    </p>

    <button type="button" on:click|stopPropagation={() => (visible = false)} disabled={deleting}>
      {$i18n.core.no}
    </button>

    <button
      type="button"
      on:click|stopPropagation={() => dispatch('papyDelete')}
      disabled={deleting}>
      {$i18n.core.yes}
    </button>
  </div>
</Popover>

<style lang="scss">
  @use '../../themes/mixins/overlay';

  .content {
    @include overlay.content;
  }

  button:first-of-type {
    margin-right: 0.45rem;
  }
</style>
