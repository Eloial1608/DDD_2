import { PlanRepository } from '@Core/Plan/domain/PlanRepository'
import { Plan } from '@Core/Plan/domain/Plan'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class FinderByCriteria {
  constructor (private readonly repository: PlanRepository) {}

  async find (criteria: Criteria): Promise<Array<Plan>> {
    return await this.repository.search(criteria)
  }
}
