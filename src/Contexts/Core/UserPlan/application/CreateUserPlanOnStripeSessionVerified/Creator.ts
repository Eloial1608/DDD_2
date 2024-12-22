import { RenovationInterval } from '@Core/UserPlan/domain/ValueObjects/RenovationInterval'
import { UserPlanRepository } from '@Core/UserPlan/domain/UserPlanRepository'
import { Id } from '@Core/UserPlan/domain/ValueObjects/Id'
import { Name } from '@Core/UserPlan/domain/ValueObjects/Name'
import { PlanId } from '@Core/UserPlan/domain/ValueObjects/PlanId'
import { Price } from '@Core/UserPlan/domain/ValueObjects/Price'
import { RenovationType } from '@Core/UserPlan/domain/ValueObjects/RenovationType'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { UserPlan } from '@Core/UserPlan/domain/UserPlan'
import { ExpiresAt } from '@Core/UserPlan/domain/ValueObjects/ExpiresAt'

export class Creator {
  constructor (private readonly repository: UserPlanRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    name: Name,
    planId: PlanId,
    price: Price,
    renovationInterval: RenovationInterval,
    renovationType: RenovationType
  ) {
    const expiresAtDate = new Date()
    expiresAtDate.setDate(expiresAtDate.getDate() + 30)

    const userPlan = UserPlan.create(
      id,
      name,
      planId,
      price,
      renovationInterval,
      renovationType,
      new ExpiresAt(expiresAtDate)
    )

    await this.repository.persist(userPlan)
    await this.eventBus.publish(userPlan.pullDomainEvents())
  }
}
