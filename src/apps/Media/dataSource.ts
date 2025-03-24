import './env/loadEnv'
import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { TypeOrmConfigFactory } from '@Media/Shared/infrastructure/persistence/typeorm/TypeOrmConfigFactory'

export const AppDataSource = new DataSource(TypeOrmConfigFactory.create())
