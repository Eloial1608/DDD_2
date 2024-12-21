import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { Updater } from './Updater'
import { Id } from '@Core/Community/domain/ValueObjects/Id'
import { SpaceDeletedDomainEvent } from '@Core/Space/domain/Events/SpaceDeletedDomainEvent'

export class UpdateTotalSpacesOnSpaceDeletedHandler implements DomainEventSubscriber<SpaceDeletedDomainEvent> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Array<DomainEventClass> {
    return [SpaceDeletedDomainEvent]
  }

  async on (domainEvent: SpaceDeletedDomainEvent): Promise<void> {
    await this.updater.run(
      new Id(domainEvent.communityId),
      -1
    )
  }
}
