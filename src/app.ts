import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as graphqlHTTP from 'express-graphql';

import { createLoaders, db, Database, DataLoaders } from './db';
import Schema from './graphql';

export interface ApiContext {
  db: Database;
  loaders: DataLoaders;
}

export const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/languages', (req, res) => {

  const loaders = createLoaders(db);

  graphqlHTTP({
    schema: Schema,
    graphiql: process.env.NODE_ENV !== 'production',
    context: {
      db,
      loaders,
    } as ApiContext
  })(req, res);
});
