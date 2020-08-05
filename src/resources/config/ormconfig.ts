import dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';

dotenv.config();

const ormconfig: ConnectionOptions & { seeds: string[], factories: string[] } = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/application/database/models/**/*.entity{.ts,.js}'],
  migrations: ['dist/application/database/migrations/**/*.js'],
  subscribers: ['dist/application/database/subscribers/**/*.js'],
  seeds: ['dist/application/database/seeds/**/*.seed.js'],
  factories: ['dist/application/database/factories/**/*.factory.js'],
  cli: {
    entitiesDir: 'src/application/database/entities',
    migrationsDir: 'src/application/database/migrations',
    subscribersDir: 'src/application/database/subscribers',
  },
  synchronize: false,
  logging: false,
};

export = ormconfig;
