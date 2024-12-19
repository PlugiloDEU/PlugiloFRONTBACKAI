import { Knex } from 'knex';
import path from 'path';

const config: Knex.Config = {
  client: 'better-sqlite3',
  connection: {
    filename: path.resolve(process.cwd(), 'src/db/database.sqlite')
  },
  useNullAsDefault: true,
  migrations: {
    directory: path.resolve(process.cwd(), 'src/db/migrations')
  },
  seeds: {
    directory: path.resolve(process.cwd(), 'src/db/seeds')
  }
};

export default config;
