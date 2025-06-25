import { UserDeletedDomainEvent } from '@Core/User/domain/Events/UserDeletedDomainEvent'
import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { Deleter } from './Deleter'
import { Id } from '@Projects/User/domain/ValueObjects/Id'
import { UserBannedDomainEvent } from '@Core/User/domain/Events/UserBannedDoaminEvent'

export class DeleteUserOnUserDeletedHandler implements DomainEventSubscriber <UserDeletedDomainEvent | UserBannedDomainEvent> {
  constructor (private readonly deleter: Deleter) {}

  subscribedTo (): Array<DomainEventClass> {
    return [UserDeletedDomainEvent, UserBannedDomainEvent]
  }

  async on (domainEvent: UserDeletedDomainEvent | UserBannedDomainEvent): Promise<void> {
    await this.deleter.run(
      new Id(domainEvent.id)
    )
  }
}
