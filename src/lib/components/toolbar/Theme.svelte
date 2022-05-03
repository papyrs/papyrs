<script lang="ts">
  import {Theme} from '$lib/types/theme';
  import {theme} from '$lib/stores/theme.store';
  import {i18nFormat} from '$lib/utils/i18n.utils';
  import {i18n} from '$lib/stores/i18n.store';

  let themes: Theme[] = Object.entries(Theme).map(([key, _]: [string, string]) => Theme[key]);
</script>

<aside>
  {#each themes as listTheme}
    <button
      type="button"
      class={listTheme}
      aria-label={`${i18nFormat($i18n.settings.switch_theme, [
        {placeholder: '{0}', value: listTheme}
      ])}`}
      on:click={() => theme.select(listTheme)}
      class:selected={listTheme === $theme} />
  {/each}
</aside>

<style lang="scss">
  aside {
    display: flex;
    align-items: center;

    flex-wrap: wrap;
    width: 6.15rem;

    margin: 0.45rem 1rem;
    padding: 0 0.15rem;

    grid-row: 1;
    grid-column: 1 / 2;

    @media (min-width: 768px) {
      flex-direction: column-reverse;
      align-items: flex-end;

      grid-row: 2;

      width: auto;

      margin: 0;
      padding: 0.45rem 0.15rem;
    }
  }

  button {
    padding: 0.4rem;
    margin: 0.35rem 0.45rem;

    @media (min-width: 768px) {
      margin: 0.25rem 0;
    }

    &.selected {
      box-shadow: 1px 1px black;
      transform: translateX(2px) translateY(2px);
    }

    background: var(--theme-switcher-buttom-background, #ffeed6);
    color: var(--theme-switcher-buttom-color, #000000);

    &:hover:not(:disabled),
    &:focus:not(:disabled) {
      background: var(--theme-switcher-buttom-background-hover, #ffcf98);
    }

    &.aero-blue {
      --theme-switcher-buttom-background: #d5ffef;
      --theme-switcher-buttom-color: #000000;

      &:hover:not(:disabled),
      &:focus:not(:disabled) {
        --theme-switcher-buttom-background-hover: #97ffd2;
      }
    }

    &.lavender-blue {
      --theme-switcher-buttom-background: #c4cdff;
      --theme-switcher-buttom-color: #000000;

      &:hover:not(:disabled),
      &:focus:not(:disabled) {
        --theme-switcher-buttom-background-hover: #7888ff;
      }
    }

    &.pink-lace {
      --theme-switcher-buttom-background: #ffd5f7;
      --theme-switcher-buttom-color: #000000;

      &:hover:not(:disabled),
      &:focus:not(:disabled) {
        --theme-switcher-buttom-background-hover: #ff97e7;
      }
    }

    &.baby-pink {
      --theme-switcher-buttom-background: #ffcece;
      --theme-switcher-buttom-color: #000000;

      &:hover:not(:disabled),
      &:focus:not(:disabled) {
        --theme-switcher-buttom-background-hover: #ff8989;
      }
    }
  }
</style>
