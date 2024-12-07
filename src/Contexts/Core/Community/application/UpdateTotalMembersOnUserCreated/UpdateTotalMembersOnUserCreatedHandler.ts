import { UserCreatedDomainEvent } from '@Core/User/domain/Events/UserCreatedDomainEvent'
import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { Updater } from './Updater'
import { Id } from '@Core/Community/domain/ValueObjects/Id'

export class UpdateTotalMembersOnUserCreatedHandler implements DomainEventSubscriber<UserCreatedDomainEvent> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Array<DomainEventClass> {
    return [UserCreatedDomainEvent]
  }

  async on (domainEvent: UserCreatedDomainEvent): Promise<void> {
    await this.updater.run(
      new Id(domainEvent.communityId),
      1
    )
  }
}
