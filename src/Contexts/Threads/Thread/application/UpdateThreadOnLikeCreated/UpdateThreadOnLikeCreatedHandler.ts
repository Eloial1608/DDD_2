import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { Updater } from './Updater'
import { Id } from '@Threads/Thread/domain/ValueObjects/Id'
import { LikeCreatedDomainEvent } from '@Threads/Like/domain/Events/LikeCreatedDomainEvent'

export class UpdateThreadOnLikeCreatedHandler implements DomainEventSubscriber <LikeCreatedDomainEvent> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Array<DomainEventClass> {
    return [LikeCreatedDomainEvent]
  }

  async on (domainEvent: LikeCreatedDomainEvent): Promise<void> {
    await this.updater.run(
      new Id(domainEvent.threadId)
    )
  }
}
