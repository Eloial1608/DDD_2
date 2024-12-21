import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Id } from '@Core/UserPlan/domain/ValueObjects/Id'
import { Name } from '@Core/UserPlan/domain/ValueObjects/Name'
import { PlanId } from '@Core/UserPlan/domain/ValueObjects/PlanId'
import { Price } from '@Core/UserPlan/domain/ValueObjects/Price'
import { RenovationInterval } from '@Core/UserPlan/domain/ValueObjects/RenovationInterval'
import { RenovationType } from '@Core/UserPlan/domain/ValueObjects/RenovationType'
import { ExpiresAt } from '@Core/UserPlan/domain/ValueObjects/ExpiresAt'
import { CreatedAt } from '@Core/UserPlan/domain/ValueObjects/CreatedAt'
import { UpdatedAt } from '@Core/UserPlan/domain/ValueObjects/UpdatedAt'
import { UserPlanCreatedDomainEvent } from './Events/UserPlanCreatedDomainEvent'

export class UserPlan extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly name: Name,
        readonly planId: PlanId,
        readonly price: Price,
        readonly renovationInterval: RenovationInterval,
        readonly renovationType: RenovationType,
        readonly expiresAt: ExpiresAt,
        readonly createdAt: CreatedAt,
        readonly updatedAt: UpdatedAt

  ) {
    super()
  }

  static create (
    id: Id,
    name: Name,
    planId: PlanId,
    price: Price,
    renovationInterval: RenovationInterval,
    renovationType: RenovationType,
    expiresAt: ExpiresAt
  ): UserPlan {
    const userPlan = new UserPlan(
      id,
      name,
      planId,
      price,
      renovationInterval,
      renovationType,
      expiresAt,
      new CreatedAt(new Date()),
      new UpdatedAt(new Date())
    )

    userPlan.record(UserPlanCreatedDomainEvent.fromAggregate(userPlan))

    return userPlan
  }
}
