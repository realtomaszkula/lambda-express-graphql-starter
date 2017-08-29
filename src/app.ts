import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';

import { createLoaders, db } from './db';
import * as Schema from './graphql';

export const app = express();

app.get('/doctor/work-experience', (req, res) => {

  const loaders = createLoaders(db);

  graphqlHTTP({
    schema: Schema,
    context: {
      loaders,
    }
  });
});
