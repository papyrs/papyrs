import type {StorageFile} from '@deckdeckgo/editor';
import type {ExcalidrawScene} from '@deckdeckgo/excalidraw';
import {jsonMapReviver} from '@deckdeckgo/excalidraw';
import {uploadOfflineFile} from '@deckdeckgo/offline';
import {fetchAsset} from '@deckdeckgo/sync';

export const loadExcalidrawScene = async (
  dataSrc: string | undefined
): Promise<ExcalidrawScene | undefined> => {
  if (!dataSrc) {
    return undefined;
  }

  const data: string | undefined = await fetchAsset(dataSrc);
  return data !== undefined ? JSON.parse(data, jsonMapReviver) : undefined;
};

const blobToFile = ({blob, filename}: {blob: Blob; filename: string}): File => {
  return new File([blob], filename, {lastModified: new Date().getTime(), type: blob.type});
};

export const exportExcalidraw = async ({
  excalidraw,
  filename
}: {
  excalidraw: HTMLDeckgoExcalidrawElement;
  filename: string;
}): Promise<{imgFile: StorageFile; dataFile: StorageFile}> => {
  const blob: Blob = await excalidraw.toBlob();
  const imgFile: StorageFile = await uploadOfflineFile(
    blobToFile({blob, filename: `${filename}.webp`}),
    'images',
    10485760
  );

  const data: Blob = await excalidraw.exportScene();
  const dataFile: StorageFile = await uploadOfflineFile(
    blobToFile({blob: data, filename: `${filename}.json`}),
    'data',
    10485760
  );

  return {
    imgFile,
    dataFile
  };
};
