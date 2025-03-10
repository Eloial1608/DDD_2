import { SpaceMemberDeletedDomainEvent } from '@Core/SpaceMember/domain/Events/SpaceMemberDeletedDomainEvent'
import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { Deleter } from './Deleter'
import { Id } from '@Threads/SpaceMember/domain/ValueObjects/Id'

export class DeleteSpaceMemberOnSpaceMemberDeletedHandler implements DomainEventSubscriber <SpaceMemberDeletedDomainEvent> {
  constructor (private readonly deleter: Deleter) {}

  subscribedTo (): Array<DomainEventClass> {
    return [SpaceMemberDeletedDomainEvent]
  }

  async on (domainEvent: SpaceMemberDeletedDomainEvent): Promise<void> {
    await this.deleter.run(
      new Id(domainEvent.id)
    )
  }
}
