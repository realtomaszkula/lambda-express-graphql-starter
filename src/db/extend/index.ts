import { LanguageRepository } from '../sql';

export * from '../';
export interface IExtensions {
  languages: LanguageRepository;
}

export const extend = (obj: any) => {
  obj.languages = new LanguageRepository(obj);
};
