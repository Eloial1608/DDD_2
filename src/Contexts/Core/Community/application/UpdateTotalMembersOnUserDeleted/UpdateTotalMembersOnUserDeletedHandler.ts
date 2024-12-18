import { UserDeletedDomainEvent } from '@Core/User/domain/Events/UserDeletedDomainEvent'
import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { Updater } from './Updater'
import { Id } from '@Core/Community/domain/ValueObjects/Id'

export class UpdateTotalMembersOnUserDeletedHandler implements DomainEventSubscriber<UserDeletedDomainEvent> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Array<DomainEventClass> {
    return [UserDeletedDomainEvent]
  }

  async on (domainEvent: UserDeletedDomainEvent): Promise<void> {
    await this.updater.run(
      new Id(domainEvent.communityId),
      -1
    )
  }
}
