import * as dotenv from 'dotenv';
import * as path from 'path';
import { matchers } from './matchers';

dotenv.config({ path: path.join(__dirname, '.env') });

beforeEach(() => {
  expect.extend(matchers);
});
