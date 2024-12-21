import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Id } from './ValueObjects/Id'
import { Name } from './ValueObjects/Name'
import { Description } from './ValueObjects/Description'
import { Price } from './ValueObjects/Price'
import { AllowedFeatures } from './ValueObjects/AllowedFeatures'
import { RenovationInterval } from './ValueObjects/RenovationInterval'
import { RenovationType } from './ValueObjects/RenovationType'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { UpdatedAt } from './ValueObjects/UpdatedAt'
import { Nullable } from '@Shared/domain/Nullable'
import { DeletedAt } from './ValueObjects/DeletedAt'
import { AllowedUsers } from './ValueObjects/AllowedUsers'
import { AllowedSubcommunities } from './ValueObjects/AllowedSubcommunities'
import { IsPrivate } from './ValueObjects/IsPrivate'
import { StripeId } from './ValueObjects/StripeId'

export class Plan extends AggregateRoot {
  constructor (
    readonly id: Id,
    readonly name: Name,
    readonly allowedSubcommunities: AllowedSubcommunities,
    readonly isPrivate: IsPrivate,
    readonly stripeId: StripeId,
    readonly description: Description,
    readonly price: Price,
    readonly allowedFeatures: AllowedFeatures,
    readonly allowedUsers: AllowedUsers,
    readonly renovationInterval: RenovationInterval,
    readonly renovationType: RenovationType,
    readonly createdAt: CreatedAt,
    readonly updatedAt: UpdatedAt,
    readonly deletedAt: Nullable<DeletedAt>
  ) {
    super()
  }
}
