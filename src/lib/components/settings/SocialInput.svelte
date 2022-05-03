<script lang="ts">
  export let prefix: string | undefined = undefined;
  export let custom: string | undefined = undefined;
  export let value: string | undefined;
  export let saving: boolean;
  export let arialLabel: string;
  export let input: HTMLInputElement | undefined = undefined;
</script>

<p>
  <small>
    {#if prefix !== undefined}
      {prefix}<strong>{value ? value : 'yourusername'}</strong>
    {/if}

    {#if custom !== undefined}
      {value ? value : custom}
    {/if}
  </small>
</p>

<input
  bind:this={input}
  bind:value
  aria-label={arialLabel}
  placeholder={arialLabel}
  type="text"
  maxlength={128}
  disabled={saving} />

<style lang="scss">
  p {
    margin: 0.45rem 0 0;
  }
</style>
