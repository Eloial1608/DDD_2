import { Id } from '@Core/Space/domain/ValueObjects/Id'
import { Deleter } from './Deleter'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { SpaceDeletedDomainEvent } from '@Core/Space/domain/Events/SpaceDeletedDomainEvent'

export class DeleteSpaceOnSpaceDeletedHandler implements DomainEventSubscriber<SpaceDeletedDomainEvent> {
  constructor (private readonly deleter: Deleter) {}

  subscribedTo (): DomainEventClass[] {
    return [SpaceDeletedDomainEvent]
  }

  async on (event: SpaceDeletedDomainEvent): Promise<void> {
    await this.deleter.run(
      new Id(event.id)
    )
  }
}
