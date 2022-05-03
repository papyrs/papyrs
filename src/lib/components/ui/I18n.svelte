<script lang="ts">
  export let text: string;
  export let placeholder: string;

  let split: string[];
  $: split = text.split(placeholder);
</script>

{split[0]}
<slot />
{#if split.length > 1}
  {split[1]}
{/if}
