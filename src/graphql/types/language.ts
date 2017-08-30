import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';

export const Language = new GraphQLObjectType({
  name: 'Language',
  description: 'Language',
  fields: {
    languageId: { type: new GraphQLNonNull(GraphQLInt) },
    languageName: { type: new GraphQLNonNull(GraphQLString) },
  }
});


export const LanguageInsert = new GraphQLInputObjectType({
  name: 'LanguageInsert',
  description: 'Language insert',
  fields: {
    languageName: { type: new GraphQLNonNull(GraphQLString) },
  }
});

export const LanguageUpdate = new GraphQLInputObjectType({
  name: 'LanguageUpdate',
  description: 'Language update',
  fields: {
    languageId: { type: new GraphQLNonNull(GraphQLInt) },
    languageName: { type: new GraphQLNonNull(GraphQLString) },
  }
});
