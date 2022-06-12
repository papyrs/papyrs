<script lang="ts">
  import Modal from '../ui/Modal.svelte';
  import type {Image} from '../../types/image';
  import {emit} from '../../utils/events.utils';
  import {createEventDispatcher} from 'svelte';
  import {i18n} from '../../stores/i18n.store';
  import Assets from '../assets/Assets.svelte';
  import {uploadOfflineFile} from '@deckdeckgo/offline';
  import type {StorageFile} from '@deckdeckgo/editor';

  let inputImage: HTMLInputElement | undefined;

  const dispatch = createEventDispatcher();

  const emitImg = (image: Image | undefined) =>
    emit<Image | undefined>({message: 'papySaveImg', detail: image});

  const uploadImage = async () => {
    const storageFile: StorageFile = await uploadOfflineFile(
      inputImage?.files[0],
      'images',
      10485760
    );

    selectImage(storageFile);
  };

  const selectImage = (storageFile: StorageFile) => {
    emitImg(storageFile);
    dispatch('papyClose');
  };

  const close = async () => {
    emitImg(undefined);
    dispatch('papyClose');
  };
</script>

<Modal on:papyClose={async () => await close()}>
  <span slot="title">
    {$i18n.menu.assets}
  </span>

  <Assets
    listOfflineFiles={true}
    deleteAsset={false}
    on:papySelectAsset={({detail}) => selectImage(detail)} />

  <button slot="stickyFooter" type="button" on:click={() => inputImage?.click()}
    >{$i18n.editor.upload_image}</button>

  <input
    bind:this={inputImage}
    type="file"
    multiple={false}
    accept="image/x-png,image/jpeg,image/gif,image/svg+xml,image/webp"
    on:change={async () => await uploadImage()} />
</Modal>

<style lang="scss">
  input {
    visibility: hidden;
    opacity: 0;
  }
</style>
