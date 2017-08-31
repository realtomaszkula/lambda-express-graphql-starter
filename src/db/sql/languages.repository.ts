import { Database } from '../index';
import {
  existsSQL, indexSQL, findByIdSQL, createSQL, updateSQL, destroySQL,
} from './languages.sql';

import {
  Language, LanguageInsertParams, LanguageUpdateParams,
} from './languages.interfaces';

export class LanguageRepository {

  constructor(public db: Database) { }

  index = async (): Promise<Language[]> => {
    return this.db.manyOrNone(indexSQL);
  }

  exists = async (id: number): Promise<boolean> => {
    const { exists } = await this.db.one(existsSQL, id);
    return exists;
  }

  findById = async (id: number): Promise<Language> => {
    return this.db.oneOrNone(findByIdSQL, id);
  }

  create = async (params: LanguageInsertParams) => {
    return this.db.one(createSQL, params);
  }

  update = async (params: LanguageUpdateParams) => {
    return this.db.one(updateSQL, params);
  }

  destroy = async (id: number): Promise<boolean> => {
    await this.db.one(destroySQL, id);
    return true;
  }

}
