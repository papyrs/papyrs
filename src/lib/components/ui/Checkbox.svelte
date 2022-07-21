<script lang="ts">
  import {i18n} from '$lib/stores/i18n.store';
  import {createEventDispatcher} from 'svelte';

  const dispatch = createEventDispatcher();

  export let checkboxId: string;
  export let checked: boolean;

  const onChange = () => {
    checked = !checked;
    dispatch('papyChecked');
  };
</script>

<div>
  <input type="checkbox" id={checkboxId} checked={checked} on:change={onChange} />
  <label for={checkboxId}><slot /></label>
</div>

<style lang="scss">
  input {
    margin-top: 1rem;
  }
</style>
