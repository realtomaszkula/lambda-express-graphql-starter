
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

  describe('#language', () => {
    let data: { language: Language };
    let inserted: Language;
    let queried: Language;

    const query = `
      query Q ($id: Int!) {
        language(languageId: $id) {
          languageId
          languageName
        }
      }
    `;

    beforeEach(async () => {
      const params: LanguageInsertParams = {
        languageName: 'polski',
      };

      inserted = await db.languages.create(params);

      ({ data, errors } = await graphql(Schema, query, {}, context, {
        id: inserted.languageId
      }) as any);

      queried = data.language;
    });

    it('returns succesfully', () => {
      expect(errors).toBeUndefined();
    });

    it('returns language', () => {
      expect(inserted).toEqual(queried);
    });
  });

  describe('#languages', () => {
    let data: { languages: Language[] };
    let l1: Language;
    let l2: Language;
    let languages: Language[];

    const query = `
      query Q {
        languages {
          languageId
          languageName
        }
      }
    `;

    beforeEach(async () => {
      const p1: LanguageInsertParams = {
        languageName: 'polski',
      };

      const p2: LanguageInsertParams = {
        languageName: 'angielski',
      };

      l1 = await db.languages.create(p1);
      l2 = await db.languages.create(p2);

      ({ data, errors } = await graphql(Schema, query, {}, context) as any);

      languages = data.languages;
    });

    it('returns succesfully', () => {
      expect(errors).toBeUndefined();
    });

    it('returns languages', () => {
      expect(languages).toHaveLength(2);

      languages.forEach(lang => expect(lang).toBeALanguage());
    });
  });

});
