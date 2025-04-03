import { DataSourceOptions } from 'typeorm'

export class TypeOrmConfigFactory {
  static create (): DataSourceOptions {
    const routes = ['staging', 'production'].includes(process.env.NODE_ENV!)
      ? ['dist/src/Contexts/Marketplace/**/*Schema*']
      : ['src/Contexts/Marketplace/**/*Schema*']

    return {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      synchronize: false,
      logging: false,
      entities: routes,
      migrations: ['persistence/migrations/marketplace/*.js']
    }
  }
}
