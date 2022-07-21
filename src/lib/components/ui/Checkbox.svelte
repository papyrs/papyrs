<script lang="ts">
  import {createEventDispatcher} from 'svelte';

  const dispatch = createEventDispatcher();

  export let checkboxId: string;
  export let checked: boolean;
  export let disabled = false;

  const onChange = () => {
    checked = !checked;
    dispatch('papyChecked');
  };
</script>

<div>
  <input type="checkbox" id={checkboxId} {checked} on:change={onChange} {disabled} />
  <label for={checkboxId} class:disabled><slot /></label>
</div>

<style lang="scss">
  input {
    margin-top: 1rem;
  }

  .disabled {
    opacity: 0.4;
  }
</style>
