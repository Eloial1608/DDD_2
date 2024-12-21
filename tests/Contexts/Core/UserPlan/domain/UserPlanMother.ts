import { Id } from '@Core/UserPlan/domain/ValueObjects/Id'
import { Name } from '@Core/UserPlan/domain/ValueObjects/Name'
import { Description } from '@Core/UserPlan/domain/ValueObjects/Description'
import { PlanId } from '@Core/UserPlan/domain/ValueObjects/PlanId'
import { Price, PriceCurrency, PriceValue } from '@Core/UserPlan/domain/ValueObjects/Price'
import { RenovationInterval } from '@Core/Plan/domain/ValueObjects/RenovationInterval'
import { RenovationType } from '@Core/UserPlan/domain/ValueObjects/RenovationType'
import { ExpiresAt } from '@Core/UserPlan/domain/ValueObjects/ExpiresAt'
import { CreatedAt } from '@Core/UserPlan/domain/ValueObjects/CreatedAt'
import { UpdatedAt } from '@Core/UserPlan/domain/ValueObjects/UpdatedAt'
import { UserPlan } from '@Core/UserPlan/domain/UserPlan'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'
import { WordMother } from '@Tests/Contexts/Shared/domain/WordMother'
import { RenovationTypeValues } from '@Shared/domain/SharedValueObjects/SharedRenovationType'

export class UserPlanMother {
  static create (params: Partial<UserPlan>): UserPlan {
    return new UserPlan(
      params.id ?? new Id(UuidMother.random()),
      params.name ?? new Name(WordMother.random()),
      params.description ?? new Description(WordMother.random()),
      params.planId ?? new PlanId(UuidMother.random()),
      params.price ?? new Price(
        new PriceValue(0),
        new PriceCurrency('EUR')
      ),
      params.renovationInterval ?? new RenovationInterval(1),
      params.renovationType ?? new RenovationType(RenovationTypeValues.MONTH),
      params.expiresAt ?? new ExpiresAt(new Date()),
      params.createdAt ?? new CreatedAt(new Date()),
      params.updatedAt ?? new UpdatedAt(new Date())
    )
  }

  static random (): UserPlan {
    return this.create({})
  }
}
