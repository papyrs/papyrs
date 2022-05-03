<script lang="ts">
  import Toast from './Toast.svelte';
  import {toasts} from '$lib/stores/toasts.store';

  const onError = ({detail: text}: CustomEvent<string>) =>
    toasts.error({
      text
    });
</script>

<svelte:window on:ddgError={onError} />

{#if $toasts.length > 0}
  <Toast msg={$toasts[0]} />
{/if}
