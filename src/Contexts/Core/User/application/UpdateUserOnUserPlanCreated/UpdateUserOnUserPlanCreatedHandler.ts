import { Updater } from './Updater'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { Id } from '@Core/User/domain/ValueObjects/Id'
import { UserPlanCreatedDomainEvent } from '@Core/UserPlan/domain/Events/UserPlanCreatedDomainEvent'

export class UpdateUserOnUserPlanCreatedHandler implements DomainEventSubscriber<UserPlanCreatedDomainEvent> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): DomainEventClass[] {
    return [UserPlanCreatedDomainEvent]
  }

  async on (event: UserPlanCreatedDomainEvent): Promise<void> {
    await this.updater.run(
      new Id(event.id)
    )
  }
}
