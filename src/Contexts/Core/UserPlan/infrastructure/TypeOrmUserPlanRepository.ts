import { UserPlan } from '../domain/UserPlan'
import { UserPlanRepository } from '../domain/UserPlanRepository'
import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { UserPlanSchema } from './enitity/UserPlanSchema'
import { Id } from '@Core/SpaceMember/domain/ValueObjects/Id'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class TypeOrmSpaceMemberRepository extends TypeOrmRepository<UserPlan> implements UserPlanRepository {
  protected get entitySchema (): EntitySchema {
    return UserPlanSchema
  }

  async find (id: Id): Promise<Nullable<UserPlan>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<UserPlan[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (spaceMember: UserPlan): Promise<void> {
    await (await this.repository()).save(spaceMember)
  }
}