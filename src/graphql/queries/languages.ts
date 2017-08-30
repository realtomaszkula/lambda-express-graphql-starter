import {
  GraphQLFieldConfigMap,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLList,
} from 'graphql';

import { ApiContext } from '../../app';
import { Language } from './../types/language';

export default {
  language: {
    type: new GraphQLNonNull(Language),
    description: 'Get language by id',
    args: {
      languageId: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve: (obj: any, { languageId }: any, { db }: ApiContext) => {
      return db.languages.findById(languageId);
    }
  },
  languages: {
    type: new GraphQLList(new GraphQLNonNull(Language)),
    description: 'Get all languages',
    resolve: (obj: any, args: any, { db }: ApiContext) => {
      return db.languages.index();
    }
  }
} as GraphQLFieldConfigMap<any, any>;
