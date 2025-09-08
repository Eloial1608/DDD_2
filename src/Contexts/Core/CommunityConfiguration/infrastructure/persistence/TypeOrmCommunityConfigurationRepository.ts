import { CommunityConfiguration } from '@Core/CommunityConfiguration/domain/CommunityConfiguration'
import { CommunityConfigurationRepository } from '@Core/CommunityConfiguration/domain/CommunityConfigurationRepository'
import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { CommunityConfigurationSchema } from './entity/CommunityConfigurationSchema'
import { Id } from '@Core/CommunityConfiguration/domain/ValueObjects/Id'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class TypeOrmCommunityConfigurationRepository extends TypeOrmRepository<CommunityConfiguration> implements CommunityConfigurationRepository {
  protected get entitySchema (): EntitySchema {
    return CommunityConfigurationSchema
  }

  async find (id: Id): Promise<Nullable<CommunityConfiguration>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<CommunityConfiguration[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (communityconfiguration: CommunityConfiguration): Promise<void> {
    await (await this.repository()).save(communityconfiguration)
  }
}
