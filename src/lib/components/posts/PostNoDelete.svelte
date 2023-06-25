<script lang="ts">
  import {i18n} from '../../stores/i18n.store';
  import {IconDelete, Popover} from '@papyrs/ui';

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
  <div class="content">
    <p>{$i18n.profile.no_delete}</p>

    <button type="button" on:click|stopPropagation={() => (visible = false)}>
      {$i18n.core.ok}
    </button>
  </div>
</Popover>

<style lang="scss">
  @use '@papyrs/ui/styles/mixins/overlay';

  .content {
    @include overlay.content;
  }

  p {
    margin: 0;
  }
</style>
