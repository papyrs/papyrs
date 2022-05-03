<script lang="ts">
  import {i18n} from '$lib/stores/i18n.store';
  import IconOpen from '$lib/components/icons/IconOpen.svelte';
  import {createEventDispatcher} from 'svelte';

  const dispatch = createEventDispatcher();

  let loadInput: HTMLInputElement | undefined;

  const openDoc = () => loadInput?.click();
</script>

<button type="button" role="menuitem" aria-haspopup="menu" on:click={openDoc} class="menu">
  <IconOpen slot="icon" />
  <span>{$i18n.tools.open}</span>
</button>

<input
  type="file"
  accept=".papyrs"
  bind:this={loadInput}
  on:change={() => dispatch('papyImportFile', loadInput?.files[0])}
  tabindex="-1" />

<style lang="scss">
  input {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 1px;
    height: 1px;

    opacity: 0;
    visibility: hidden;
  }
</style>
