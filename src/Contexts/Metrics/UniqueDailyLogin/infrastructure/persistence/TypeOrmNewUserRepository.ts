import { UniqueDailyLogin } from '@Metrics/UniqueDailyLogin/domain/UniqueDailyLogin'
import { UniqueDailyLoginRepository } from '@Metrics/UniqueDailyLogin/domain/UniqueDailyLoginRepository'
import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { UniqueDailyLoginSchema } from './entity/UniqueDailyLoginSchema'
import { Id } from '@Metrics/UniqueDailyLogin/domain/ValueObjects/Id'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class TypeOrmUniqueDailyLoginRepository extends TypeOrmRepository<UniqueDailyLogin> implements UniqueDailyLoginRepository {
  protected get entitySchema (): EntitySchema {
    return UniqueDailyLoginSchema
  }

  async find (id: Id): Promise<Nullable<UniqueDailyLogin>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<UniqueDailyLogin[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (uniquedailylogin: UniqueDailyLogin): Promise<void> {
    await (await this.repository()).save(uniquedailylogin)
  }
}
