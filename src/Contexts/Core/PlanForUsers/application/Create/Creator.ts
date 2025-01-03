import { RenovationType } from '@Core/CommunityPlan/domain/ValueObjects/RenovationType'
import { PlanForUsersAlreadyExists } from '@Core/PlanForUsers/domain/Errors/PlanForUsersAlreadyExistsByIs'
import { PlanForUsers } from '@Core/PlanForUsers/domain/PlanForUsers'
import { PlanForUsersRepository } from '@Core/PlanForUsers/domain/PlanForUsersRepository'
import { CommunityId } from '@Core/PlanForUsers/domain/ValueObjects/CommunityId'
import { Description } from '@Core/PlanForUsers/domain/ValueObjects/Description'
import { Id } from '@Core/PlanForUsers/domain/ValueObjects/Id'
import { Name } from '@Core/PlanForUsers/domain/ValueObjects/Name'
import { Price } from '@Core/PlanForUsers/domain/ValueObjects/Price'
import { RenovationInterval } from '@Core/PlanForUsers/domain/ValueObjects/RenovatioInterval'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { Nullable } from '@Shared/domain/Nullable'

export class Creator {
  constructor (private readonly repository: PlanForUsersRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    name: Name,
    description: Nullable<Description>,
    communityId: CommunityId,
    price: Price,
    renovationInterval: RenovationInterval,
    renovationType: RenovationType
  ) {
    const existingPlanForUsersById = await this.repository.find(id)

    if (existingPlanForUsersById) throw new PlanForUsersAlreadyExists(existingPlanForUsersById.id)

    const planForUsers = await PlanForUsers.create(
      id,
      name,
      description,
      communityId,
      price,
      renovationInterval,
      renovationType
    )

    await this.repository.persist(planForUsers)

    await this.eventBus.publish(planForUsers.pullDomainEvents())
  }
}
