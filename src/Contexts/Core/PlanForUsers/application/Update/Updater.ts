import { RenovationType } from '@Core/CommunityPlan/domain/ValueObjects/RenovationType'
import { PlanNotFound } from '@Core/Plan/domain/Errors/PlanNotFound'
import { PlanForUsersRepository } from '@Core/PlanForUsers/domain/PlanForUsersRepository'
import { CommunityId } from '@Core/PlanForUsers/domain/ValueObjects/CommunityId'
import { Description } from '@Core/PlanForUsers/domain/ValueObjects/Description'
import { Id } from '@Core/PlanForUsers/domain/ValueObjects/Id'
import { Name } from '@Core/PlanForUsers/domain/ValueObjects/Name'
import { Price } from '@Core/PlanForUsers/domain/ValueObjects/Price'
import { RenovationInterval } from '@Core/PlanForUsers/domain/ValueObjects/RenovatioInterval'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { Nullable } from '@Shared/domain/Nullable'

export class Updater {
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
    const plan = await this.repository.find(id)

    if (!plan || plan.communityId.valueOf() !== communityId.valueOf()) throw new PlanNotFound(id)

    const updatedPlan = await plan.update(
      name,
      description,
      price,
      renovationInterval,
      renovationType
    )

    await this.repository.persist(updatedPlan)

    await this.eventBus.publish(updatedPlan.pullDomainEvents())
  }
}
