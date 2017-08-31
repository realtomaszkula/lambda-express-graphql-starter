
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

export const existsSQL = `
SELECT EXISTS(
  SELECT 1
  FROM languages
  WHERE language_id = $1
)
`;

export const indexSQL = `
  SELECT *
  FROM languages
  ORDER BY language_id
`;

export const findByIdSQL = `
  SELECT *
  FROM languages
  WHERE language_id = $1
`;

export const createSQL = `
  INSERT INTO languages (language_name)
  VALUES ($[languageName])
  RETURNING *
`;

export const updateSQL = `
  UPDATE languages
  SET
    language_name = $[languageName]
  WHERE language_id = $[languageId]
  RETURNING *
`;

export const destroySQL = `
  DELETE
  FROM languages
  WHERE language_id = $1
  RETURNING language_id;
`;
