import { LanguageUpdateParams } from './../../src/db/extend/languages.repository';
import Schema from '../../src/graphql';
import { Database, createLoaders, db, LanguageInsertParams, Language } from '../../src/db';
import { ApiContext } from '../../src/app';
import { graphql, GraphQLError } from 'graphql';

const getDB = () => db;

describe('Doctors Queries', () => {
  let db: Database;
  let context: ApiContext;
  let errors: GraphQLError[];

  beforeAll(async () => await getDB().none('delete from languages'));

  beforeEach(async () => {
    db = getDB();
    context = {
      db,
      loaders: createLoaders(db),
    };

    await db.none('delete from languages');
  });

  describe('#insertLanguage', () => {
    let data: { createLanguage: Language };
    let language: Language;
    let params: LanguageInsertParams;

    const mutation = `
      mutation M ($language: LanguageInsert!) {
        createLanguage(language: $language) {
          languageName
          languageId
        }
      }`;

    beforeEach(async () => {
      params = {
        languageName: 'polski',
      };

      ({ data, errors } = await graphql(Schema, mutation, {}, context, {
        language: params
      }) as any);

      language = data.createLanguage;
    });

    it('returns successfully', () => {
      expect(errors).toBeUndefined();
    });

    it('returns langauge', () => {
      expect(language).toHaveProperty('languageId');
      expect(language).toHaveProperty('languageName', params.languageName);
    });

    it('inserts language to db', async () => {
      expect(await db.languages.exists(language.languageId)).toBe(true);
    });
  });

  describe('#updateLanguage', () => {
    let data: { updateLanguage: Language };

    let originalLanguage: Language;
    let updateParams: LanguageUpdateParams;
    let updatedLanguage: Language;

    const mutation = `
      mutation M ($language: LanguageUpdate!) {
        updateLanguage(language: $language) {
          languageName
          languageId
        }
      }`;

    beforeEach(async () => {
      const originalParams: LanguageInsertParams = {
        languageName: 'polski',
      };

      originalLanguage = await db.languages.create(originalParams);

      updateParams = {
        languageId: originalLanguage.languageId,
        languageName: 'angielski',
      };

      ({ data, errors } = await graphql(Schema, mutation, {}, context, {
        language: updateParams
      }) as any);

      updatedLanguage = data.updateLanguage;
    });

    it('returns successfully', () => {
      expect(errors).toBeUndefined();
    });

    it('returns updated langauge', () => {
      expect(updatedLanguage).toHaveProperty('languageId');
      expect(updatedLanguage).toHaveProperty('languageName', updateParams.languageName);
    });
  });

  describe('#destroyLanguage', () => {
    let data: { destroyLanguage: boolean };
    let language: Language;
    let destroyed: boolean;

    const mutation = `
      mutation M ($id: Int!) {
        destroyLanguage(id: $id)
      }`;

    beforeEach(async () => {
      const params: LanguageInsertParams = {
        languageName: 'polski',
      };

      language = await db.languages.create(params);

      ({ data, errors } = await graphql(Schema, mutation, {}, context, {
        id: language.languageId
      }) as any);

      destroyed = data.destroyLanguage;
    });

    it('returns successfully', () => {
      expect(errors).toBeUndefined();
      expect(destroyed).toBe(true);
    });

    it('deletes language from db', async () => {
      expect(await db.languages.exists(language.languageId)).toBe(false);
    });
  });
});
