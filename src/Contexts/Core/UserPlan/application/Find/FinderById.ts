import { UserPlanRepository } from '@Core/UserPlan/domain/UserPlanRepository'
import { Id } from '@Core/UserPlan/domain/ValueObjects/Id'
import { UserPlan } from '@Core/UserPlan/domain/UserPlan'
import { UserPlanNotFound } from '@Core/UserPlan/domain/Errors/UserPlanNotFound'

export class FinderById {
  constructor (private readonly repository: UserPlanRepository) {}

  async find (id: Id): Promise<UserPlan> {
    const userPlan = await this.repository.find(id)

    if (!userPlan) throw new UserPlanNotFound(id)

    return userPlan
  }
}
