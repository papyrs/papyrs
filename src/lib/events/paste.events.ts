import {toasts} from '../stores/toasts.store';

export const cleanPaste = ($event: ClipboardEvent) => {
  const paste: string = $event.clipboardData.getData('text/html');

  const div = document.createElement('div');
  div.innerHTML = paste;

  const images: NodeListOf<HTMLImageElement> = div.querySelectorAll('img');
  if (images.length > 0) {
    $event.preventDefault();

    toasts.show({
      text: 'Pasting images from external source is currently not supported. You can upload images with the help of the "+" action.',
      level: 'warn'
    });

    return;
  }

  const iframes: NodeListOf<HTMLIFrameElement> = div.querySelectorAll('iframe');
  if (iframes.length > 0) {
    $event.preventDefault();

    toasts.show({
      text: 'Pasting iframes from external source is not allowed.',
      level: 'warn'
    });
  }

  console.log('1')
};
