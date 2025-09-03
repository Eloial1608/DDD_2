import { CreatedEntity } from '@Metrics/CreatedEntity/domain/CreatedEntity'
import { CreatedEntityRepository } from '@Metrics/CreatedEntity/domain/CreatedEntityRepository'
import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { CreatedEntitySchema } from './entity/CreatedEntitySchema'
import { Id } from '@Metrics/CreatedEntity/domain/ValueObjects/Id'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class TypeOrmCreatedEntityRepository extends TypeOrmRepository<CreatedEntity> implements CreatedEntityRepository {
  protected get entitySchema (): EntitySchema {
    return CreatedEntitySchema
  }

  async find (id: Id): Promise<Nullable<CreatedEntity>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<CreatedEntity[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (createdentity: CreatedEntity): Promise<void> {
    await (await this.repository()).save(createdentity)
  }
}
