import { CreatePlanForUsersCommand } from '@Core/PlanForUsers/application/Create/CreatePlanForUsersCommand'
import { PlanForUsers } from '@Core/PlanForUsers/domain/PlanForUsers'
import { Nullable } from '@Shared/domain/Nullable'

export class CreatePlanForUsersCommandMother {
  static create (
    id: string,
    name: string,
    description: Nullable<string>,
    communityId: string,
    priceValue: number,
    priceCurrency: string,
    renovationInterval: number,
    renovationType: string
  ): CreatePlanForUsersCommand {
    return new CreatePlanForUsersCommand(
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

  static fromAggregate (PlanForUsers: PlanForUsers): CreatePlanForUsersCommand {
    return this.create(
      PlanForUsers.id.valueOf(),
      PlanForUsers.name.valueOf(),
      PlanForUsers.description?.valueOf(),
      PlanForUsers.communityId.valueOf(),
      PlanForUsers.price.value.valueOf(),
      PlanForUsers.price.currency.valueOf(),
      PlanForUsers.renovationInterval.valueOf(),
      PlanForUsers.renovationType.valueOf(),
    )
  }
}
