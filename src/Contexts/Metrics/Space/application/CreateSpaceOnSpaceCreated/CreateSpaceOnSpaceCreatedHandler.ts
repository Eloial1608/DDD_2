import { SpaceCreatedDomainEvent } from '@Core/Space/domain/Events/SpaceCreatedDomainEvent'
import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { Creator } from './Creator'
import { Id } from '@Metrics/Space/domain/ValueObjects/Id'
import { CommunityId } from '@Metrics/Space/domain/ValueObjects/CommunityId'
import { Type } from '@Metrics/Space/domain/ValueObjects/Type'

export class CreateSpaceOnSpaceCreatedHandler implements DomainEventSubscriber <SpaceCreatedDomainEvent> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Array<DomainEventClass> {
    return [SpaceCreatedDomainEvent]
  }

  async on (domainEvent: SpaceCreatedDomainEvent): Promise<void> {
    await this.creator.run(
      new Id(domainEvent.id),
      new CommunityId(domainEvent.communityId),
      new Type(domainEvent.type)
    )
  }
}
