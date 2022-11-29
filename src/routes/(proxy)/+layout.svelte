<script lang="ts">
  import {Toasts} from '@papyrs/ui';
  import {i18n} from '$lib/stores/i18n.store';
</script>

{#await i18n.init() then}
  <slot />

  <Toasts />
{/await}

<style lang="scss" global>
  @use '../../../node_modules/@papyrs/ui/styles/mixins/main';

  @import '@papyrs/ui/styles/global.scss';

  :root {
    @include main.layout;
  }
</style>
