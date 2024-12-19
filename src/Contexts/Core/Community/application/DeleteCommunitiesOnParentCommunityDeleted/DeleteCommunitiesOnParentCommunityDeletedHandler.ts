import { Deleter } from './Deleter'
import { Id } from '@Core/Community/domain/ValueObjects/Id'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { CommunityDeletedDomainEvent } from '@Core/Community/domain/Events/CommunityDeletedDomainEvent'
import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'

export class DeleteCommunitiesOnParentCommunityDeletedHandler implements DomainEventSubscriber<CommunityDeletedDomainEvent> {
  constructor (private readonly deleter: Deleter) {}

  subscribedTo (): DomainEventClass[] {
    return [CommunityDeletedDomainEvent]
  }

  async on (event: CommunityDeletedDomainEvent): Promise<void> {
    await this.deleter.run(new Id(event.id))
  }
}
