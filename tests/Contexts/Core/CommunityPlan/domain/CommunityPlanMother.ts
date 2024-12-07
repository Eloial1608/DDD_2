import { CommunityPlan } from '@Core/CommunityPlan/domain/CommunityPlan'
import { AllowedFeatures } from '@Core/CommunityPlan/domain/ValueObjects/AllowedFeatures'
import { AllowedUsers } from '@Core/CommunityPlan/domain/ValueObjects/AllowedUsers'

import { CreatedAt } from '@Core/CommunityPlan/domain/ValueObjects/CreatedAt'
import { Description } from '@Core/CommunityPlan/domain/ValueObjects/Description'

import { Id } from '@Core/CommunityPlan/domain/ValueObjects/Id'
import { Name } from '@Core/CommunityPlan/domain/ValueObjects/Name'

import { UpdatedAt } from '@Core/CommunityPlan/domain/ValueObjects/UpdatedAt'
import { Price, PriceCurrency, PriceValue } from '@Core/Plan/domain/ValueObjects/Price'
import { RenovationInterval } from '@Core/Plan/domain/ValueObjects/RenovationInterval'
import { RenovationType } from '@Core/Plan/domain/ValueObjects/RenovationType'
import { PlanRenovationTypeValues } from '@Core/Shared/domain/Plan/PlanRenovationType'
import { CommunityId } from '@Shared/domain/SharedValueObjects/Community/CommunityId'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'
import { WordMother } from '@Tests/Contexts/Shared/domain/WordMother'

export class CommunityPlanMother {
  static create (params: Partial<CommunityPlan>): CommunityPlan {
    return new CommunityPlan(
      params.id ?? new Id(UuidMother.random()),
      params.communityId ?? new CommunityId(UuidMother.random()),
      params.name ?? new Name(WordMother.random()),
      params.description ?? new Description(WordMother.random()),
      params.allowedFeatures ?? new AllowedFeatures([]),
      params.price ?? new Price(
        new PriceValue(0),
        new PriceCurrency('EUR')
      ),
      params.allowedUsers ?? new AllowedUsers(1),
      params.renovationInterval ?? new RenovationInterval(4),
      params.renovationType ?? new RenovationType(PlanRenovationTypeValues.MONTH),
      params.createdAt ?? new CreatedAt(new Date()),
      params.updatedAt ?? new UpdatedAt(new Date())
    )
  }

  static random (): CommunityPlan {
    return this.create({})
  }
}
