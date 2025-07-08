import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import type { AvailabilityRule } from '../domain/AvailabilityRule'
import { AvailabilityRuleSchema } from './entity/AvailabilityRule.schema'
import type { AvailabilityRuleRepository } from '../domain/AvailabilityRuleRepository'
import type { AvailabilityRuleId } from '../domain/ValueObjects/AvailabilityRuleId'
import type { Nullable } from '@Shared/domain/Nullable'
import type { Criteria } from '@Shared/domain/Criteria/Criteria'
import type { EntitySchema } from 'typeorm'
import { Equal } from 'typeorm'

export class TypeOrmAvailabilityRuleRepository extends TypeOrmRepository<AvailabilityRule> implements AvailabilityRuleRepository {
  protected get entitySchema (): EntitySchema {
    return AvailabilityRuleSchema
  }

  async find (id: AvailabilityRuleId): Promise<Nullable<AvailabilityRule>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<AvailabilityRule[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (rule: AvailabilityRule): Promise<void> {
    await (await this.repository()).save(rule)
  }

  async delete (rule: AvailabilityRule): Promise<void> {
    await (await this.repository()).remove(rule)
  }
}
