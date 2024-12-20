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
}
