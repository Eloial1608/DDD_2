import { PlanRepository } from '@Core/Plan/domain/PlanRepository'
import { Id } from '@Core/Plan/domain/ValueObjects/Id'
import { Plan } from '@Core/Plan/domain/Plan'
import { PlanNotFound } from '@Core/Plan/domain/Errors/PlanNotFound'

export class FinderById {
  constructor (private readonly repository: PlanRepository) {}

  async find (id: Id): Promise<Plan> {
    const plan = await this.repository.find(id)

    if (!plan) throw new PlanNotFound(id)

    return plan
  }
}
