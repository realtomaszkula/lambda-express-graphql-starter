import { LambdaEnv } from '../env';
import { TConfig } from 'pg-promise';

const { host, port, database, user, password }: LambdaEnv = process.env as any;

export const config: TConfig = {
  host,
  port: Number(port),
  database,
  user,
  password,
};

