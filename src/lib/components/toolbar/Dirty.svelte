<script lang="ts">
  import {i18n} from '$lib/stores/i18n.store';
</script>

<div class="info">
  <p>{$i18n.sync.wait}</p>
</div>

<style lang="scss">
  @use '@papyrs/ui/styles/mixins/overlay';

  .info {
    @include overlay.content;
  }

  p {
    margin: 0;
  }
</style>
