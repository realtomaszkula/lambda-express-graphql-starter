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

const existsSQL = `
SELECT EXISTS(
  SELECT 1
  FROM languages
  WHERE language_id = $1
)
`;

const indexSQL = `
  SELECT *
  FROM languages
  ORDER BY language_id
`;

const findByIdSQL = `
  SELECT *
  FROM languages
  WHERE language_id = $1
`;

const createSQL = `
  INSERT INTO languages (language_name)
  VALUES ($[languageName])
  RETURNING *
`;

const updateSQL = `
  UPDATE languages
  SET
    language_name = $[languageName]
  WHERE language_id = $[languageId]
  RETURNING *
`;

const destroySQL = `
  DELETE
  FROM languages
  WHERE language_id = $1
  RETURNING language_id;
`;

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
