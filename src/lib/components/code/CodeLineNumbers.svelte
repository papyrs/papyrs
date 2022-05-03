<script lang="ts">
  import {i18n} from '$lib/stores/i18n.store';
  import {createEventDispatcher} from 'svelte';

  const dispatch = createEventDispatcher();

  export let lineNumbers: boolean;

  const onChange = () => {
    lineNumbers = !lineNumbers;
    dispatch('papyLineNumbers');
  };
</script>

<div>
  <input type="checkbox" id="lineNumbers" checked={lineNumbers} on:change={onChange} />
  <label for="lineNumbers">{$i18n.editor.display_line_number}</label>
</div>

<style lang="scss">
  input {
    margin-top: 1.45rem;
  }
</style>
