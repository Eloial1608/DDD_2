import { UserPlanRepository } from '@Core/UserPlan/domain/UserPlanRepository'
import { UserPlan } from '@Core/UserPlan/domain/UserPlan'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class FinderByCriteria {
  constructor (private readonly repository: UserPlanRepository) {}

  async find (criteria: Criteria): Promise<Array<UserPlan>> {
    return await this.repository.search(criteria)
  }
}
