import { DataSourceOptions } from 'typeorm'

export class TypeOrmConfigFactory {
  static create (): DataSourceOptions {
    return {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: false,
      logging: false,
      entities: ['dist/src/Contexts/Core/**/*Schema.js'],
      migrations: ['persistence/migrations/core/*.js']
    }
  }
}
