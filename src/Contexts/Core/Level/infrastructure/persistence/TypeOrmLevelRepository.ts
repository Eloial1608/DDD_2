import { Level } from '../../domain/Level'
import { LevelRepository } from '../../domain/LevelRepository'
import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { LevelSchema } from './entity/LevelSchema'
import { Id } from '../../domain/ValueObjects/Id'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class TypeOrmLevelRepository extends TypeOrmRepository<Level> implements LevelRepository {
  protected get entitySchema (): EntitySchema {
    return LevelSchema
  }

  async find (id: Id): Promise<Nullable<Level>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<Level[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (Level: Level): Promise<void> {
    await (await this.repository()).save(Level)
  }
}
