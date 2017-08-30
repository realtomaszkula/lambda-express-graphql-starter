import {
  GraphQLFieldConfigMap,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLInt,
} from 'graphql';
import {
  Language,
  LanguageInsert,
  LanguageUpdate,
} from '../types/language';
import { ApiContext } from '../../app';

export default {
  createLanguage: {
    type: new GraphQLNonNull(Language),
    args: {
      language: { type: new GraphQLNonNull(LanguageInsert) },
    },
    description: 'Create new language',
    resolve: (obj: any, { language }: any, { db }: ApiContext) => {
      return db.languages.create(language);
    }
  },

  updateLanguage: {
    type: new GraphQLNonNull(Language),
    description: 'Update existing language',
    args: {
      language: { type: new GraphQLNonNull(LanguageUpdate) },
    },
    resolve: (obj: any, { language }: any, { db }: ApiContext) => {
      return db.languages.update(language);
    }
  },

  destroyLanguage: {
    type: new GraphQLNonNull(GraphQLBoolean),
    description: 'Destroy existing language',
    args: {
      id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: (obj: any, { id }: any, { db }: ApiContext) => {
      return db.languages.destroy(id);
    }
  }
} as GraphQLFieldConfigMap<any, any>;
