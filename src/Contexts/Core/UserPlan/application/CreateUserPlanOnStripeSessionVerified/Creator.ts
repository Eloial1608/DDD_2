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
import { RenovationTypeValues } from '@Shared/domain/SharedValueObjects/SharedRenovationType'

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
    const userPlan = UserPlan.create(
      id,
      name,
      planId,
      price,
      renovationInterval,
      renovationType,
      this.calcExpirationDate(renovationInterval, renovationType)
    )

    await this.repository.persist(userPlan)
    await this.eventBus.publish(userPlan.pullDomainEvents())
  }

  private calcExpirationDate (renovationInterval: RenovationInterval, renovationType: RenovationType): ExpiresAt {
    const mult = {
      [RenovationTypeValues.MONTH]: 1,
      [RenovationTypeValues.YEAR]: 12
    }

    const today = new Date()

    today.setMonth(today.getMonth() + (mult[renovationType.valueOf()] * renovationInterval.valueOf()))

    return new ExpiresAt(today)
  }
}
