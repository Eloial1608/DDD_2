import { UpdatePlanForUsersCommand } from '@Core/PlanForUsers/application/Update/UpdatePlanForUsersCommand'
import { PlanForUsers } from '@Core/PlanForUsers/domain/PlanForUsers'
import { Nullable } from '@Shared/domain/Nullable'

export class UpdatePlanForUsersCommandMother {
  static update (
    id: string,
    name: string,
    description: Nullable<string>,
    communityId: string,
    priceValue: number,
    priceCurrency: string,
    renovationInterval: number,
    renovationType: string
  ): UpdatePlanForUsersCommand {
    return new UpdatePlanForUsersCommand(
      id,
      name,
      description,
      communityId,
      priceValue,
      priceCurrency,
      renovationInterval,
      renovationType
    )
  }

  static fromAggregate (PlanForUsers: PlanForUsers): UpdatePlanForUsersCommand {
    return this.update(
      PlanForUsers.id.valueOf(),
      PlanForUsers.name.valueOf(),
      PlanForUsers.description?.valueOf(),
      PlanForUsers.communityId.valueOf(),
      PlanForUsers.price.value.valueOf(),
      PlanForUsers.price.currency.valueOf(),
      PlanForUsers.renovationInterval.valueOf(),
      PlanForUsers.renovationType.valueOf()
    )
  }
}
