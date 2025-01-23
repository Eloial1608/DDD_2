import { CommunityDeletedDomainEvent } from '@Core/Community/domain/Events/CommunityDeletedDomainEvent'
import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { Deleter } from './Deleter'
import { Id } from '@Course/Community/domain/ValueObjects/Id'

export class DeleteCommunityOnCommunityDeletedHandler implements DomainEventSubscriber <CommunityDeletedDomainEvent> {
  constructor (private readonly deleter: Deleter) {}

  subscribedTo (): Array<DomainEventClass> {
    return [CommunityDeletedDomainEvent]
  }

  async on (domainEvent: CommunityDeletedDomainEvent): Promise<void> {
    await this.deleter.run(
      new Id(domainEvent.id)
    )
  }
}
