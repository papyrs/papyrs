import type {MonacoEditorOptions} from '@deckdeckgo/monaco-editor';

export interface PapyModalCodeDetail {
  code: string;
  options: MonacoEditorOptions;
}

export interface PapyModalExcalidrawDetail {
  dataSrc: string | null;
}

export interface PapyModal {
  type: 'publish' | 'code' | 'unsplash' | 'tenor' | 'storage' | 'excalidraw';
  detail?: PapyModalCodeDetail | PapyModalExcalidrawDetail;
}
