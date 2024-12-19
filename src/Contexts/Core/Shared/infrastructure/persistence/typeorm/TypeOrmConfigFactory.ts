import { DataSourceOptions } from 'typeorm'

export class TypeOrmConfigFactory {
  static create (): DataSourceOptions {
    return {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      synchronize: false,
      logging: false,
      entities: ['src/Contexts/Core/**/*Schema*', 'src/Contexts/Stripe/**/*Schema*'],
      migrations: ['persistence/migrations/core/*.js']
    }
  }
}
