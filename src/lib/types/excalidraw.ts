import type {Image} from './image';
import type {StorageFile} from '@deckdeckgo/editor';

export interface SaveExcalidraw {
    imgFile: Image | undefined;
    dataFile: StorageFile | undefined;
}
