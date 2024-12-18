import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { Updater } from './Updater'
import { Id } from '@Core/Community/domain/ValueObjects/Id'
import { SpaceCreatedDomainEvent } from '@Core/Space/domain/Events/SpaceCreatedDomainEvent'

export class UpdateTotalSpacesOnSpaceCreatedHandler implements DomainEventSubscriber<SpaceCreatedDomainEvent> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Array<DomainEventClass> {
    return [SpaceCreatedDomainEvent]
  }

  async on (domainEvent: SpaceCreatedDomainEvent): Promise<void> {
    await this.updater.run(
      new Id(domainEvent.communityId),
      1
    )
  }
}
