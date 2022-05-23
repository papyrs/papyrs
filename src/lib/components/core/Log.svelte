<script lang="ts">
  import {logs} from '$lib/stores/logs.store';
  import {afterUpdate} from 'svelte';
  import {round} from '$lib/utils/number.utils';
  import {APP_VERSION} from '../../constants/constants';

  let div: HTMLDivElement | undefined;

  afterUpdate(() => div?.scrollTo(0, div?.scrollHeight));
</script>

<div bind:this={div}>
  {#each $logs as { msg, duration }}
    <span>$ {msg} {duration ? `${round(duration / 1000)}s` : ''}</span>
  {/each}
</div>

<span class="version">Papyrs v{APP_VERSION}</span>

<style lang="scss">
  @use '../../themes/mixins/text';
  @use '../../themes/mixins/shadow';

  div {
    display: flex;
    flex-direction: column;

    width: min(700px, calc(100vw - 4.45rem));
    min-height: min(250px, calc(100vh - 200px));

    font-family: monospace;
    font-size: var(--font-size-very-small);

    @include shadow.shadow;

    background: #222222;
    color: white;

    padding: 0.45rem;
    max-height: 50px;
    height: 50px;

    overflow-y: scroll;

    &::-webkit-scrollbar-thumb {
      background-color: black;
    }
  }

  .version {
    color: white;
    font-size: calc(var(--font-size-very-small) * 0.8);
    margin-top: 0.75rem;
  }
</style>
