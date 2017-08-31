
export interface Language {
  languageId: number;
  languageName: string;
}

export interface LanguageInsertParams {
  languageName: string;
}

export interface LanguageUpdateParams {
  languageId: number;
  languageName: string;
}

