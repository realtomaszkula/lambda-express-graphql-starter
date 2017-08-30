import {
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql';

import LanguageQueries from './queries/languages';
import LanguageMutations from './mutations/languages';

const RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    ...LanguageQueries,
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: 'RootMutation',
  fields: () => ({
    ...LanguageMutations,
  }),
});

export default new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

