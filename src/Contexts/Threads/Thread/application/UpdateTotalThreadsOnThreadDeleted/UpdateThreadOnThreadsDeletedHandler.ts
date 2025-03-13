import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { Updater } from './Updater'
import { Id } from '@Threads/Thread/domain/ValueObjects/Id'
import { ThreadDeletedDomainEvent } from '@Threads/Thread/domain/Events/ThreadDeletedDomainEvent'

export class UpdateThreadOnThreadDeletedHandler implements DomainEventSubscriber <ThreadDeletedDomainEvent> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Array<DomainEventClass> {
    return [ThreadDeletedDomainEvent]
  }

  async on (domainEvent: ThreadDeletedDomainEvent): Promise<void> {
    await this.updater.run(
      new Id(domainEvent.id)
    )
  }
}
