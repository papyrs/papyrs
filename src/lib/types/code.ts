export interface SaveCode {
  code: string | undefined;
  language: string | 'javascript';
  lineNumbers: boolean;
}

export interface LanguageCode {
  language: string;
  title: string;
}
