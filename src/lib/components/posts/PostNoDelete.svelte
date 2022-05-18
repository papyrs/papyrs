<script lang="ts">
  import {i18n} from '../../stores/i18n.store';
  import IconDelete from '../icons/IconDelete.svelte';
  import Popover from '../ui/Popover.svelte';

  let visible = false;
</script>

<button
  class="icon"
  type="button"
  on:click|stopPropagation={() => (visible = true)}
  aria-label={$i18n.core.delete}>
  <IconDelete />
</button>

<Popover bind:visible center={true}>
  <div class="info">
    <p>Current edited document cannot be deleted.</p>
  </div>
</Popover>

<style lang="scss">
  @use '../../themes/mixins/overlay';

  .info {
    @include overlay.content;
  }

  p {
    margin: 0;
  }
</style>
