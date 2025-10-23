import { CommunityCreatedDomainEvent } from '@Core/Community/domain/Events/CommunityCreatedDomainEvent'
import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { Creator } from './Creator'
import { Id } from '@Metrics/Community/domain/ValueObjects/Id'
import { IsPrivate } from '@Metrics/Community/domain/ValueObjects/IsPrivate'

export class CreateCommunityOnCommunityCreatedHandler implements DomainEventSubscriber <CommunityCreatedDomainEvent> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Array<DomainEventClass> {
    return [CommunityCreatedDomainEvent]
  }

  async on (domainEvent: CommunityCreatedDomainEvent): Promise<void> {
    await this.creator.run(
      new Id(domainEvent.id),
      new IsPrivate(domainEvent.isPrivate)
    )
  }
}
