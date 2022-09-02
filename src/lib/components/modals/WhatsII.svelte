<script lang="ts">
  import {Modal} from '@papyrs/ui';
  let open = false;
</script>

<div>
  <button class="text" on:click={() => (open = true)}>What's Internet Identity?</button>
</div>

{#if open}
  <Modal on:papyClose={() => (open = false)}>
    <what-is-ii />
  </Modal>
{/if}

<style lang="scss">
  @use '@papyrs/ui/styles/mixins/shadow';

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
