import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Id } from './ValueObjects/Id'
import { Name } from './ValueObjects/Name'
import { AllowedUsers } from './ValueObjects/AllowedUsers'
import { AllowedFeatures } from './ValueObjects/AllowedFeatures'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { Description } from './ValueObjects/Description'
import { Price } from './ValueObjects/Price'
import { RenovationInterval } from './ValueObjects/RenovationInterval'
import { RenovationType } from './ValueObjects/RenovationType'
import { UpdatedAt } from './ValueObjects/UpdatedAt'
import { IsActive } from './ValueObjects/IsActive'
import { StripeId } from './ValueObjects/StripeId'

export class CommunityPlan extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly stripeId: StripeId,
        readonly name: Name,
        readonly description: Description,
        readonly allowedFeatures: AllowedFeatures,
        readonly price: Price,
        readonly isActive: IsActive,
        readonly allowedUsers: AllowedUsers,
        readonly renovationInterval: RenovationInterval,
        readonly renovationType: RenovationType,
        readonly createdAt: CreatedAt,
        readonly updatedAt: UpdatedAt
  ) {
    super()
  }

  static create (
    id: Id,
    stripeId: StripeId,
    name: Name,
    description: Description,
    allowedFeatures: AllowedFeatures,
    price: Price,
    allowedUsers: AllowedUsers,
    renovationInterval: RenovationInterval,
    renovationType: RenovationType
  ): CommunityPlan {
    const communityPlan = new CommunityPlan(
      id,
      stripeId,
      name,
      description,
      allowedFeatures,
      price,
      new IsActive(false),
      allowedUsers,
      renovationInterval,
      renovationType,
      new CreatedAt(new Date()),
      new UpdatedAt(new Date())
    )

    return communityPlan
  }
}
