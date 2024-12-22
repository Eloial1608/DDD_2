import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Id } from '@Core/PlanForUsers/domain/ValueObjects/Id'
import { Name } from '@Core/PlanForUsers/domain/ValueObjects/Name'
import { Description } from '@Core/PlanForUsers/domain/ValueObjects/Description'
import { CommunityId } from '@Core/PlanForUsers/domain/ValueObjects/CommunityId'
import { Price } from '@Core/PlanForUsers/domain/ValueObjects/Price'
import { RenovationInterval } from '@Core/PlanForUsers/domain/ValueObjects/RenovatioInterval'
import { RenovationType } from '@Core/PlanForUsers/domain/ValueObjects/RenovationType'
import { CreatedAt } from '@Core/PlanForUsers/domain/ValueObjects/CreatedAt'
import { UpdatedAt } from '@Core/PlanForUsers/domain/ValueObjects/UpdatedAt'
import { Nullable } from '@Shared/domain/Nullable'
import { PlanForUsersCreatedDomainEvent } from './Event/PlanForUsersCreatedDomainEvent'
import { PlanForUsersUpdatedDomainEvent } from './Event/PlanForUsersUpdatedDomainEvent'

export class PlanForUsers extends AggregateRoot {
  constructor (
    readonly id: Id,
    readonly name: Name,
    readonly description: Nullable<Description>,
    readonly communityId: CommunityId,
    readonly price: Price,
    readonly renovationInterval: RenovationInterval,
    readonly renovationType: RenovationType,
    readonly createdAt: CreatedAt,
    readonly updatedAt: UpdatedAt
  ) {
    super()
  }

  static create (
    id: Id,
    name: Name,
    description: Nullable<Description>,
    communityId: CommunityId,
    price: Price,
    renovationInterval: RenovationInterval,
    renovationType: RenovationType
  ): PlanForUsers {
    const planForUsers = new PlanForUsers(
      id,
      name,
      description,
      communityId,
      price,
      renovationInterval,
      renovationType,
      new CreatedAt(new Date()),
      new UpdatedAt(new Date())
    )

    planForUsers.record(PlanForUsersCreatedDomainEvent.fromAggregate(planForUsers))

    return planForUsers
  }

  update (
    name: Name,
    description: Nullable<Description>,
    price: Price,
    renovationInterval: RenovationInterval,
    renovationType: RenovationType
  ): PlanForUsers {
    const planForUsers = new PlanForUsers(
      this.id,
      name,
      description,
      this.communityId,
      price,
      renovationInterval,
      renovationType,
      this.createdAt,
      new UpdatedAt(new Date())
    )

    planForUsers.record(PlanForUsersUpdatedDomainEvent.fromAggregate(planForUsers))

    return planForUsers
  }
}
