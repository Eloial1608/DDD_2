import { SpaceDeletedDomainEvent } from '@Core/Space/domain/Events/SpaceDeletedDomainEvent'
import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { Deleter } from './Deleter'
import { AllowedTypes } from '@Shared/domain/SharedValueObjects/Space/AllowedTypes'
import { Id } from '@Posts/Space/domain/ValueObjects/Id'

export class DeleteSpaceOnSpaceDeletedHandler implements DomainEventSubscriber <SpaceDeletedDomainEvent> {
  constructor (private readonly deleter: Deleter) {}

  subscribedTo (): Array<DomainEventClass> {
    return [SpaceDeletedDomainEvent]
  }

  async on (domainEvent: SpaceDeletedDomainEvent): Promise<void> {
    if (domainEvent.type !== AllowedTypes.POST) return

    await this.deleter.run(
      new Id(domainEvent.id)
    )
  }
}
