import convict from 'convict';

export type TRestSchema = {
  PORT: number;
  SALT: string;
  DB_HOST: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_PORT: number;
  DB_NAME: string;
}

export const configRestSchema = convict<TRestSchema>({
  PORT: {
    doc: 'Port for incoming connections',
    format: 'port',
    env: 'PORT',
    default: 4000
  },
  SALT: {
    doc: 'Salt for password hash',
    format: String,
    env: 'SALT',
    default: null
  },
  DB_HOST: {
    doc: 'IP address for database server (MongoDB)',
    format: String,
    env: 'DB_HOST',
    default: '121.0.1.2',
  },
  DB_USER: {
    doc: 'User of the DB (MongoDB)',
    format: String,
    env: 'DB_USER',
    default: 'mongo',
  },
  DB_PASSWORD: {
    doc: 'Password of the DB (MongoDB)',
    format: String,
    env: 'DB_PASSWORD',
    default: 'mongo',
  },
  DB_PORT: {
    doc: 'Port number of the DB (MongoDB)',
    format: 'port',
    env: 'DB_PORT',
    default: 27017,
  },
  DB_NAME: {
    doc: 'Name of the DB (MongoDB)',
    format: String,
    env: 'DB_NAME',
    default: 'mongo',
  },
});
