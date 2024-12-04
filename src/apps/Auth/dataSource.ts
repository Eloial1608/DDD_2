import './env/loadEnv'
import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { TypeOrmConfigFactory } from '@Auth/Shared/infrastructure/Persistence/typeorm/TypeOrmConfigFactory'

export const AppDataSource = new DataSource(TypeOrmConfigFactory.create())
