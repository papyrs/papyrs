import type {StorageFile} from '@deckdeckgo/editor';
import type {Image} from './image';

export interface SaveExcalidraw {
  imgFile: Image | undefined;
  dataFile: StorageFile | undefined;
}
