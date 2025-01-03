import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { Updater } from './Updater'
import { Id } from '@Posts/Post/domain/ValueObjects/Id'
import { LikeDeletedDomainEvent } from '@Posts/Like/domain/Events/LikeDeletedDomainEvent'

export class UpdatePostOnLikeDeletedHandler implements DomainEventSubscriber <LikeDeletedDomainEvent> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Array<DomainEventClass> {
    return [LikeDeletedDomainEvent]
  }

  async on (domainEvent: LikeDeletedDomainEvent): Promise<void> {
    await this.updater.run(
      new Id(domainEvent.postId)
    )
  }
}
