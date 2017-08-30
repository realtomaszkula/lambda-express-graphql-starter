/* Load local env */
import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.join(__dirname, '.env') });

/* Load app */
import { app } from '../src/app';

/* Run local server */
const port = 4200;
app.listen(port, () => console.log(`Listening on port: ${port}`));
