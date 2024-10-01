import convict from 'convict';

export type TRestSchema = {
  PORT: number;
  SALT: string;
  DB_HOST: string;
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
  }
});
