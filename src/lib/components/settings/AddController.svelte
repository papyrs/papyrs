<script lang="ts">
  import {auth} from '$lib/stores/auth.store';
  import {Popover} from '@papyrs/ui';
  import {reloadApp} from '$lib/utils/nav.utils';
  import {toastsError, toastsShow} from '$lib/stores/toasts.store';
  import {busy} from '$lib/stores/busy.store';
  import {setCanistersController} from '$lib/services/admin.services';
  import {createEventDispatcher} from "svelte";

  let saving = false;
  let visible = false;

  let controller: string | undefined;
  let validConfirm = false;

  $: validConfirm = controller !== '' && controller !== undefined;

  const dispatch = createEventDispatcher();

  const handleSubmit = async ($event: MouseEvent | TouchEvent) => {
    $event.preventDefault();

    if (!validConfirm) {
      return;
    }

    busy.start();

    try {
      await setCanistersController(controller);

      dispatch("papyControllerAdded");

      visible = false;

      toastsShow({
        text: "Controller successfully added. ✔️",
        level: "info"
      })
    } catch (err) {
      toastsError({
        text: 'Something went wrong while adding a controller.',
        detail: err
      });
    }

    busy.stop();
  };
</script>

<button
  type="button"
  disabled={saving || $auth.authUser === null || !$auth.loggedIn}
  on:click={() => (visible = true)}>
  Add a controller
</button>

<Popover bind:visible center={true} closeButton={true}>
  <div class="content">
    <p class="please">Please provide the principal for your additional controller and submit to update the settings.</p>

    <form on:submit={async ($event) => await handleSubmit($event)}>
      <input bind:value={controller} type="text" placeholder="Principal" disabled={saving} />

      <button type="submit" disabled={saving || !validConfirm}> Submit </button>
    </form>
  </div>
</Popover>

<style lang="scss">
  @use '@papyrs/ui/styles/mixins/overlay';

  .content {
    @include overlay.content;
  }

  .please {
    margin-bottom: 0.45rem;
  }

  h1 {
    padding-top: 1rem;
  }
</style>
