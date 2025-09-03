import { UserRetention } from '@Metrics/UserRetention/domain/UserRetention'
import { UserRetentionRepository } from '@Metrics/UserRetention/domain/UserRetentionRepository'
import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { UserRetentionSchema } from './entity/UserRetentionSchema'
import { Id } from '@Metrics/UserRetention/domain/ValueObjects/Id'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class TypeOrmUserRetentionRepository extends TypeOrmRepository<UserRetention> implements UserRetentionRepository {
  protected get entitySchema (): EntitySchema {
    return UserRetentionSchema
  }

  async find (id: Id): Promise<Nullable<UserRetention>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<UserRetention[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (userretention: UserRetention): Promise<void> {
    await (await this.repository()).save(userretention)
  }
}