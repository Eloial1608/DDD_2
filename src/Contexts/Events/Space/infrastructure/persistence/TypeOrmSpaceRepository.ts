import { Space } from '@Events/Space/domain/Space'
import { SpaceRepository } from '@Events/Space/domain/SpaceRepository'
import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { SpaceSchema } from './entity/SpaceSchema'
import { Id } from '@Events/Space/domain/ValueObjects/Id'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class TypeOrmSpaceRepository extends TypeOrmRepository<Space> implements SpaceRepository {
  protected get entitySchema (): EntitySchema {
    return SpaceSchema
  }

  async find (id: Id): Promise<Nullable<Space>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<Space[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (space: Space): Promise<void> {
    await (await this.repository()).save(space)
  }

  async delete (space: Space): Promise<void> {
    await (await this.repository()).remove(space)
  }
}
