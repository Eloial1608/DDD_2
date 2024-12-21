import { Plan } from '@Core/Plan/domain/Plan'
import { AllowedFeatures } from '@Core/Plan/domain/ValueObjects/AllowedFeatures'
import { AllowedUsers } from '@Core/Plan/domain/ValueObjects/AllowedUsers'
import { CreatedAt } from '@Core/Plan/domain/ValueObjects/CreatedAt'
import { Description } from '@Core/Plan/domain/ValueObjects/Description'
import { Id } from '@Core/Plan/domain/ValueObjects/Id'
import { Name } from '@Core/Plan/domain/ValueObjects/Name'
import { Price, PriceCurrency, PriceValue } from '@Core/Plan/domain/ValueObjects/Price'
import { RenovationInterval } from '@Core/Plan/domain/ValueObjects/RenovationInterval'
import { RenovationType } from '@Core/Plan/domain/ValueObjects/RenovationType'
import { UpdatedAt } from '@Core/Plan/domain/ValueObjects/UpdatedAt'
import { RenovationTypeValues } from '@Shared/domain/SharedValueObjects/SharedRenovationType'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'
import { WordMother } from '@Tests/Contexts/Shared/domain/WordMother'

export class PlanMother {
  static create (params: Partial<Plan>): Plan {
    return new Plan(
      params.id ?? new Id(UuidMother.random()),
      params.name ?? new Name(WordMother.random()),
      params.description ?? new Description(WordMother.random()),
      params.price ?? new Price(
        new PriceValue(0),
        new PriceCurrency('EUR')
      ),
      params.allowedFeatures ?? new AllowedFeatures([]),
      params.allowedUsers ?? new AllowedUsers(1),
      params.renovationInterval ?? new RenovationInterval(1),
      params.renovationType ?? new RenovationType(RenovationTypeValues.MONTH),
      params.createdAt ?? new CreatedAt(new Date()),
      params.updatedAt ?? new UpdatedAt(new Date()),
      params.deletedAt ?? null
    )
  }

  static random (): Plan {
    return this.create({})
  }
}
