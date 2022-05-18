<script lang="ts">
  import {i18n} from '$lib/stores/i18n.store';
  import {auth} from '$lib/stores/auth.store';
  import Popover from '$lib/components/ui/Popover.svelte';
  import I18n from '$lib/components/ui/I18n.svelte';
  import {i18nFormat} from '$lib/utils/i18n.utils';
  import {deleteProfile} from '$lib/services/settings.services';
  import {reloadApp} from '$lib/utils/nav.utils';
  import {toasts} from '$lib/stores/toasts.store';
  import {busy} from '$lib/stores/busy.store';

  let saving = false;
  let visible = false;

  let confirmText: string | undefined;
  let validConfirm = false;

  $: validConfirm = confirmText === 'papyrs';

  const handleSubmit = async ($event: MouseEvent | TouchEvent) => {
    $event.preventDefault();

    if (!validConfirm) {
      return;
    }

    busy.start();

    try {
      await deleteProfile();

      reloadApp();
    } catch (err) {
      toasts.error({
        text: 'Something went wrong while deleting the user.',
        detail: err
      });
    }

    busy.stop();
  };
</script>

<h1>{$i18n.settings.danger_zone}</h1>
<p>{$i18n.settings.no_way_back}</p>

<button
  type="button"
  disabled={saving || $auth.authUser === null || !$auth.loggedIn}
  on:click={() => (visible = true)}>
  {$i18n.settings.delete_user}
</button>

<Popover bind:visible center={true} closeButton={true}>
  <div class="content">
    <p>{$i18n.settings.cannot_undone}</p>

    <p class="please">
      <I18n text={$i18n.settings.type_ddg_to_confirm} placeholder={`{0}`}
        ><strong>papyrs</strong></I18n>
    </p>

    <form on:submit={async ($event) => await handleSubmit($event)}>
      <input
        bind:value={confirmText}
        type="text"
        aria-label={`${i18nFormat($i18n.settings.type_ddg_to_confirm, [
          {placeholder: '{0}', value: 'papyrs'}
        ])}`}
        maxlength={64}
        disabled={saving} />

      <button type="submit" disabled={saving || !validConfirm}>
        {$i18n.settings.i_understand}
      </button>
    </form>
  </div>
</Popover>

<style lang="scss">
  @use '../../themes/mixins/overlay';

  .content {
    @include overlay.content;
  }

  .please {
    margin-bottom: 0.45rem;
  }
</style>
