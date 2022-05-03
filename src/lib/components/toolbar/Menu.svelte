<script lang="ts">
  import Open from '$lib/components/toolbar/Open.svelte';
  import {exportDataFile, initNewDoc} from '$lib/utils/toolbar.utils';
  import IconExport from '$lib/components/icons/IconExport.svelte';
  import {i18n} from '$lib/stores/i18n.store';
  import Popover from '$lib/components/ui/Popover.svelte';
  import IconNew from '$lib/components/icons/IconNew.svelte';
  import {importDataFile} from '$lib/utils/toolbar.utils';
  import Button from '$lib/components/ui/Button.svelte';
  import IconMenu from '$lib/components/icons/IconMenu.svelte';
  import {emit} from '$lib/utils/events.utils';
  import IconList from '$lib/components/icons/IconList.svelte';
  import IconTwitter from '$lib/components/icons/IconTwitter.svelte';
  import IconAssets from '$lib/components/icons/IconAssets.svelte';
  import IconGitHub from '$lib/components/icons/IconGitHub.svelte';
  import {goto} from '$app/navigation';
  import IconPublish from '$lib/components/icons/IconPublish.svelte';
  import {sync} from '$lib/stores/sync.store';
  import Dirty from '$lib/components/toolbar/Dirty.svelte';
  import IconDiscord from '$lib/components/icons/IconDiscord.svelte';

  let visible: boolean | undefined;
  let button: HTMLButtonElement | undefined;

  const close = () => (visible = false);

  const onAction = async (callback: () => Promise<void>) => {
    close();

    await callback();
  };

  const onImportFile = async ({detail}: CustomEvent<File | undefined>) => {
    close();

    await importDataFile(detail);
  };
</script>

<Button on:click={() => (visible = true)} bind:button>
  <IconMenu slot="icon" />
  {$i18n.nav.menu}
</Button>

<Popover bind:visible anchor={button}>
  {#if $sync.dirty}
    <Dirty />
  {:else}
    <button
      type="button"
      role="menuitem"
      aria-haspopup="menu"
      on:click={async () => await onAction(initNewDoc)}
      class="menu">
      <IconNew />
      <span>{$i18n.tools.new}</span>
    </button>

    <Open on:papyImportFile={onImportFile} />

    <button
      type="button"
      role="menuitem"
      aria-haspopup="menu"
      on:click={async () => await onAction(exportDataFile)}
      class="menu">
      <IconExport />
      <span>{$i18n.editor.export}</span>
    </button>

    <button
      type="button"
      role="menuitem"
      aria-haspopup="menu"
      class="menu"
      on:click={async () => await onAction(async () => emit({message: 'papyPublish'}))}>
      <IconPublish />
      <span>{$i18n.publish_edit.publish_now}</span>
    </button>

    <hr />

    <button
      type="button"
      role="menuitem"
      aria-haspopup="menu"
      class="menu"
      on:click={async () => await goto('/posts')}>
      <IconList />
      <span>{$i18n.menu.posts}</span>
    </button>

    <button
      type="button"
      role="menuitem"
      aria-haspopup="menu"
      class="menu"
      on:click={async () => await goto('/assets')}>
      <IconAssets />
      <span>{$i18n.menu.assets}</span>
    </button>

    <hr />

    <a
      aria-label="Papyrs on Twitter"
      href="https://twitter.com/PapyrsApp"
      class="menu"
      role="menuitem"
      aria-haspopup="menu"
      rel="noopener norefferer">
      <IconTwitter />
      <span>Twitter</span>
    </a>

    <a
      aria-label="Join the Papyrs server on Discord"
      href="https://discord.gg/EV76WqDuZW"
      class="menu"
      role="menuitem"
      aria-haspopup="menu"
      rel="noopener norefferer">
      <IconDiscord />
      <span>Discord</span>
    </a>

    <a
      aria-label="Papyrs in open source - Repo on GitHub"
      href="https://github.com/papyrs/papyrs"
      class="menu"
      aria-haspopup="menu"
      rel="noopener norefferer">
      <IconGitHub />
      <span>GitHub</span>
    </a>
  {/if}
</Popover>

<style lang="scss">
  hr {
    width: 100%;
    margin: 0.45rem auto;
    background: black;
  }
</style>
