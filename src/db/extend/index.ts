import { LanguageRepository } from './languages.repository';

export * from './languages.repository';
export interface IExtensions {
  languages: LanguageRepository;
}

export const extend = (obj: any) => {
  obj.languages = new LanguageRepository(obj);
};
