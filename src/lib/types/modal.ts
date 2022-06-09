import type {MonacoEditorOptions} from '@deckdeckgo/monaco-editor';

export interface PapyModalCodeDetail {
  code: string;
  options: MonacoEditorOptions;
}

export interface PapyModal {
  type: 'publish' | 'code' | 'unsplash' | 'tenor' | 'storage' | 'excalidraw';
  detail?: PapyModalCodeDetail;
}
