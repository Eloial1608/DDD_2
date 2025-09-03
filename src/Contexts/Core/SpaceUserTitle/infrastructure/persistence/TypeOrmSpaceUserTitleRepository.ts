import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { SpaceUserTitleSchema } from './entity/SpaceUserTitleSchema'
import { Id } from '@Core/Space/domain/ValueObjects/Id'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { SpaceUserTitle } from '@Core/SpaceUserTitle/domain/SpaceUserTitle'
import { SpaceUserTitleRepository } from '@Core/SpaceUserTitle/domain/SpaceUserTitleRepository'

export class TypeOrmSpaceUserTitleRepository extends TypeOrmRepository<SpaceUserTitle> implements SpaceUserTitleRepository {
  protected get entitySchema (): EntitySchema {
    return SpaceUserTitleSchema
  }

  async find (id: Id): Promise<Nullable<SpaceUserTitle>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<SpaceUserTitle[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (spaceUserTitle: SpaceUserTitle): Promise<void> {
    await (await this.repository()).save(spaceUserTitle)
  }

  async delete (spaceUserTitle: SpaceUserTitle): Promise<void> {
    await (await this.repository()).remove(spaceUserTitle)
  }
}
