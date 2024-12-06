import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { CommunityId } from './ValueObjects/CommunityId'
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



export class CommunityPlan extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly communityId: CommunityId,
        readonly name: Name,
        readonly description: Description,
        readonly allowedFeatures: AllowedFeatures,
        readonly price: Price,
        readonly allowedUsers: AllowedUsers,
        readonly renovationInterval: RenovationInterval,
        readonly renovationType: RenovationType,
        readonly createdAt: CreatedAt,
        readonly updatedAt: UpdatedAt,
  ) {
    super()
  }

  static create (
    id: Id,
    communityId: CommunityId,
    name: Name,
    description: Description,
    allowedFeatures: AllowedFeatures,
    price: Price,
    allowedUsers: AllowedUsers,
    renovationInterval: RenovationInterval,
    RenovationType: RenovationType,
  ): CommunityPlan {
    const communityPlan = new CommunityPlan(
      id,
      communityId,
      name,
      description,
      allowedFeatures,
      price,
      allowedUsers,
      renovationInterval,
      RenovationType,
      new CreatedAt(new Date()),
      new UpdatedAt(new Date()),
    )


    return communityPlan
  }

}
