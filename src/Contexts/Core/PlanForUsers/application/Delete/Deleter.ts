import { Id } from '@Core/PlanForUsers/domain/ValueObjects/Id'
import { PlanForUsersRepository } from '@Core/PlanForUsers/domain/PlanForUsersRepository'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { CommunityId } from '@Core/PlanForUsers/domain/ValueObjects/CommunityId'

export class Deleter {
  constructor (private readonly repository: PlanForUsersRepository, private readonly eventBus: EventBus) {}

  async run (id: Id, communityId: CommunityId): Promise<void> {
    const existingPlanForUsers = await this.repository.find(id)
    if (!existingPlanForUsers || existingPlanForUsers.communityId.valueOf() !== communityId.valueOf()) return

    const planForUsers = existingPlanForUsers.delete()

    await this.repository.delete(planForUsers)

    await this.eventBus.publish(planForUsers.pullDomainEvents())
  }
}
