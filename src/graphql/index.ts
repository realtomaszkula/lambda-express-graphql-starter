import {
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql';

const RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: 'RootMutation',
  fields: () => ({
  }),
});

export default new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

