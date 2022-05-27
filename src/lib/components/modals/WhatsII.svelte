<script lang="ts">
  import Modal from '../ui/Modal.svelte';
  import {importWhatIsII} from '../../utils/import.utils';

  let open = false;

  const loadWhatsII = async () => await importWhatIsII();
</script>

<div>
  <button class="text" on:click={() => (open = true)}>What's Internet Identity?</button>
</div>

{#if open}
  <Modal on:papyClose={() => open = false} on:introend={loadWhatsII} >
    <what-is-ii />
  </Modal>
{/if}

<style lang="scss">
  @use '../../themes/mixins/shadow';

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  button {
    font-size: var(--font-size-ultra-small);
  }

  :global(what-is-ii img) {
    @include shadow.shadow;
    border-style: solid;
  }
</style>
