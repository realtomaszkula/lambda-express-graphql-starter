import { Database } from '../index';

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


const indexSQL = `
  SELECT *
  FROM languages
`;

const findByIdSQL = `
  SELECT *
  FROM langauges
  WHERE language_id = $1
`;

const createSQL = `
  INSERT INTO languages (language_name)
  VALUES ($[language_name])
  RETURNING *
`;

const updateSQL = `
  UPDATE languages
  SET
    language_name = $[language_name]
  WHERE langauge_id = $[language_id]
  RETURNING *
`;

const destroySQL = `
  DELETE
  FROM langauges
  WHERE language_id = $1
  RETUNRING language_id;
`;

export class LanguageRepository {

  constructor(public db: Database) { }

  index = async (): Promise<Language[]> => {
    return this.db.manyOrNone(indexSQL);
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
