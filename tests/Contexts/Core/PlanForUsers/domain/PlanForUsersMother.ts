import { PriceCurrency } from '@Core/Plan/domain/ValueObjects/Price'
import { PlanForUsers } from '@Core/PlanForUsers/domain/PlanForUsers'
import { CreatedAt } from '@Core/PlanForUsers/domain/ValueObjects/CreatedAt'
import { Description } from '@Core/PlanForUsers/domain/ValueObjects/Description'
import { Id } from '@Core/PlanForUsers/domain/ValueObjects/Id'
import { Name } from '@Core/PlanForUsers/domain/ValueObjects/Name'
import { Price } from '@Core/PlanForUsers/domain/ValueObjects/Price'
import { RenovationInterval } from '@Core/PlanForUsers/domain/ValueObjects/RenovatioInterval'
import { RenovationType } from '@Core/PlanForUsers/domain/ValueObjects/RenovationType'
import { UpdatedAt } from '@Core/PlanForUsers/domain/ValueObjects/UpdatedAt'
import { PlanId } from '@Core/UserPlan/domain/ValueObjects/PlanId'
import { PriceValue } from '@Core/UserPlan/domain/ValueObjects/Price'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'
import { WordMother } from '@Tests/Contexts/Shared/domain/WordMother'
import { RenovationTypeValues } from '@Shared/domain/SharedValueObjects/SharedRenovationType'

export class PlanForUsersMother {
  static create (params: Partial<PlanForUsers>): PlanForUsers {
    return new PlanForUsers(
      params.id ?? new Id(UuidMother.random()),
      params.name ?? new Name(WordMother.random()),
      params.description ?? new Description(WordMother.random()),
      params.communityId ?? new PlanId(UuidMother.random()),
      params.price ?? new Price(
        new PriceValue(0),
        new PriceCurrency('EUR')
      ),
      params.renovationInterval ?? new RenovationInterval(1),
      params.renovationType ?? new RenovationType(RenovationTypeValues.MONTH),
      params.createdAt ?? new CreatedAt(new Date()),
      params.updatedAt ?? new UpdatedAt(new Date())
    )
  }

  static random(): PlanForUsers {
    return this.create({})
  }
}
