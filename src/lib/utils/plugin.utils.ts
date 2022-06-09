import type {SaveCode} from '$lib/types/code';
import type {Image} from '$lib/types/image';
import type {PapyModal} from '$lib/types/modal';
import {isUnsplash} from '$lib/utils/assets.utils';
import {emit} from '$lib/utils/events.utils';
import type {StorageFile, TenorGif, UnsplashPhoto} from '@deckdeckgo/editor';
import {initDeckgoLazyImgAttributes} from '@deckdeckgo/editor';
import type {StyloPluginCreateParagraphsParams} from '@papyrs/stylo';
import {createEmptyElement, transformParagraph} from '@papyrs/stylo/dist/stylo/index.esm';
import {get} from 'svelte/store';
import {i18n} from '../stores/i18n.store';

export const createParagraphImage = async ({
  image,
  paragraph,
  container
}: {
  image: UnsplashPhoto | TenorGif | StorageFile;
  paragraph: HTMLElement;
  container: HTMLElement;
}) => {
  const figure = document.createElement('figure');
  figure.setAttribute('contenteditable', 'false');

  const deckgoImg = document.createElement('deckgo-lazy-img');

  const img = initDeckgoLazyImgAttributes({
    element: deckgoImg,
    image
  });

  const figureCaption: HTMLElement = initFigCaption({image});

  figure.append(img, figureCaption);

  const emptyDiv: HTMLElement = createEmptyElement({nodeName: 'div'});

  await transformParagraph({
    elements: [figure, emptyDiv],
    paragraph,
    container,
    focus: 'last'
  });
};

const initFigCaption = ({image}: {image: UnsplashPhoto | TenorGif | StorageFile}): HTMLElement => {
  const figCaption: HTMLElement = document.createElement('figcaption');
  figCaption.setAttribute('contenteditable', 'true');

  if (!isUnsplash(image)) {
    return figCaption;
  }

  const {user} = image as UnsplashPhoto;
  if (!user.portfolio_url) {
    figCaption.innerText += `${user.name}`;
    return figCaption;
  }

  const aUser: HTMLAnchorElement = document.createElement('a');
  aUser.setAttribute('rel', 'noopener noreferrer');
  aUser.setAttribute('target', '_blank');
  aUser.setAttribute('href', `${user.links.html}?utm_source=Papyrs&utm_medium=referral`);
  aUser.innerText = user.name;

  const aUnsplash: HTMLAnchorElement = document.createElement('a');
  aUnsplash.setAttribute('rel', 'noopener noreferrer');
  aUnsplash.setAttribute('target', '_blank');
  aUnsplash.setAttribute(
    'href',
    'https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'
  );
  aUnsplash.innerText = 'Unsplash';

  figCaption.innerHTML = get(i18n)
    .editor.unplash_credit.replace('{0}', aUser.outerHTML)
    .replace('{1}', aUnsplash.outerHTML);

  return figCaption;
};

const addCode = ({
  detail,
  pluginParams
}: {
  detail: SaveCode | undefined | null;
  pluginParams: StyloPluginCreateParagraphsParams;
}) => {
  if (!detail) {
    // We emit an undefined value when we close/cancel the modal because we use a once event listener
    return;
  }

  const {container, paragraph} = pluginParams;

  const innerHTML = detail.code || '\u200B';
  const language = detail.language || 'javascript';
  const lineNumbers = detail.lineNumbers || true;

  const code: HTMLElement = document.createElement('deckgo-highlight-code');
  code.setAttribute('terminal', 'papyrs');
  code.setAttribute('language', language);
  code.setAttribute('line-numbers', `${lineNumbers}`);

  const slot: HTMLElement = document.createElement('code');
  slot.setAttribute('slot', 'code');
  slot.innerHTML = innerHTML;

  code.append(slot);

  transformParagraph({
    elements: [code, createEmptyElement({nodeName: 'div'})],
    paragraph,
    container,
    focus: 'last'
  });
};

export const openNewCodeModal = async ({
  pluginParams
}: {
  pluginParams: StyloPluginCreateParagraphsParams;
}) => {
  document.addEventListener(
    'papySaveCode',
    async ({detail}: CustomEvent<SaveCode | undefined | null>) =>
      await addCode({pluginParams, detail}),
    {once: true}
  );

  emit<PapyModal>({message: 'papyModal', detail: {type: 'code'}});
};

export const openExcalidrawModal = async ({
  pluginParams
}: {
  pluginParams: StyloPluginCreateParagraphsParams;
}) => {
  document.addEventListener(
    'papySaveExcalidraw',
    async ({detail}: CustomEvent<SaveCode | undefined | null>) =>
      await addCode({pluginParams, detail}),
    {once: true}
  );

  emit<PapyModal>({message: 'papyModal', detail: {type: 'excalidraw'}});
};

const addImage = async ({
  detail,
  pluginParams
}: {
  detail: Image | undefined | null;
  pluginParams: StyloPluginCreateParagraphsParams;
}) => {
  if (!detail) {
    // We emit an undefined value when we close/cancel the modal because we use a once event listener
    return;
  }

  const {container, paragraph} = pluginParams;

  await createParagraphImage({
    image: detail,
    container,
    paragraph
  });
};

export const openImgModal = async ({
  modal,
  pluginParams
}: {
  modal: 'unsplash' | 'tenor' | 'storage';
  pluginParams: StyloPluginCreateParagraphsParams;
}) => {
  document.addEventListener(
    'papySaveImg',
    async ({detail}: CustomEvent<Image | undefined | null>) =>
      await addImage({pluginParams, detail}),
    {once: true}
  );

  emit<PapyModal>({message: 'papyModal', detail: {type: modal}});
};
