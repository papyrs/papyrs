import {cleanNode, dirtyAttributes, isElementNode} from '@deckdeckgo/editor';
import {getSelection} from '@deckdeckgo/utils';

export const cleanCopy = async ($event: ClipboardEvent) => {
  // Firefox does not support .write()
  if (typeof navigator.clipboard['write'] !== 'function') {
    return;
  }

  const selection: Selection | null = getSelection();
  const range: Range | undefined = selection.getRangeAt(0);

  if (!range) {
    return;
  }

  $event.preventDefault();

  // Selecting only the code of a block of code returns a selection linked to the <article /> not a proper range
  const articleAnchor: boolean =
    isElementNode(selection.anchorNode) &&
    (selection.anchorNode as HTMLElement).classList.contains('deckgo-doc');

  const data: ClipboardItems = articleAnchor
    ? clipboardSelection({selection})
    : clipboardParagraphs({range});

  await navigator.clipboard.write(data);
};

const clipboardSelection = ({selection}: {selection: Selection}): ClipboardItems => {
  const typeText = 'text/plain';
  const blobText = new Blob([selection.toString()], {type: typeText});

  return [new ClipboardItem({[typeText]: blobText})];
};

const clipboardParagraphs = ({range}: {range: Range}): ClipboardItems => {
  const div = document.createElement('div');
  div.appendChild(range.cloneContents());

  // We preserve contenteditable because <figure contenteditable="false" />
  const clean: Node | null = cleanNode({
    node: div,
    deep: true,
    attributes: [
      ...dirtyAttributes.filter((attr: string) => attr !== 'contenteditable'),
      'paragraph_id'
    ]
  });

  const element: HTMLElement = clean as HTMLElement;

  const type = 'text/html';
  const blob = new Blob([element.innerHTML], {type});

  const typeText = 'text/plain';
  const blobText = new Blob(
    [
      Array.from(element.childNodes)
        .map((node: Node) => node.textContent)
        .join('\n')
    ],
    {type: typeText}
  );

  return [new ClipboardItem({[type]: blob, [typeText]: blobText})];
};
