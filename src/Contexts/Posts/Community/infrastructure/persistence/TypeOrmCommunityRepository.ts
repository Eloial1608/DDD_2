import { Community } from '@Posts/Community/domain/Community'
import { CommunityRepository } from '@Posts/Community/domain/CommunityRepository'
import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { CommunitySchema } from './entity/CommunitySchema'
import { Id } from '@Posts/Community/domain/ValueObjects/Id'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class TypeOrmCommunityRepository extends TypeOrmRepository<Community> implements CommunityRepository {
  protected get entitySchema (): EntitySchema {
    return CommunitySchema
  }

  async find (id: Id): Promise<Nullable<Community>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<Community[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (community: Community): Promise<void> {
    await (await this.repository()).save(community)
  }

  async delete (community: Community): Promise<void> {
    await (await this.repository()).remove(community)
  }
}
