import { Plan } from '@Core/Plan/domain/Plan'
import { PlanRepository } from '@Core/Plan/domain/PlanRepository'
import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { PlanSchema } from './entity/PlanSchema'
import { Id } from '@Core/Plan/domain/ValueObjects/Id'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class TypeOrmPlanRepository extends TypeOrmRepository<Plan> implements PlanRepository {
  protected get entitySchema (): EntitySchema {
    return PlanSchema
  }

  async find (id: Id): Promise<Nullable<Plan>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<Plan[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (plan: Plan): Promise<void> {
    await (await this.repository()).save(plan)
  }
}
