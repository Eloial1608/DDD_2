import { SpaceDeletedDomainEvent } from '@Core/Space/domain/Events/SpaceDeletedDomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { Deleter } from './Deleter'
import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { SpaceId } from '@Core/SpaceMember/domain/ValueObjects/SpaceId'

export class DeleteSpaceMemberOnSpaceDeletedHandler implements DomainEventSubscriber<SpaceDeletedDomainEvent> {
  constructor (private readonly deleter: Deleter) {}

  subscribedTo (): Array<DomainEventClass> {
    return [SpaceDeletedDomainEvent]
  }

  async on (event: SpaceDeletedDomainEvent) {
    await this.deleter.run(new SpaceId(event.id))
  }
}
