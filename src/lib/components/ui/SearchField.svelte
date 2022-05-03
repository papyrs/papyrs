<script lang="ts">
  import {i18n} from '$lib/stores/i18n.store';

  export let input: HTMLInputElement | undefined = undefined;
  export let searchTerm: string | undefined = undefined;
</script>

<input
  bind:this={input}
  bind:value={searchTerm}
  aria-label={$i18n.editor.search_term}
  name="searchTerm"
  placeholder={$i18n.editor.search_term}
  type="text" />

<style lang="scss">
  input {
    width: 100%;
  }
</style>
