import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { Updater } from './Updater'
import { Id } from '@Media/Media/domain/ValueObjects/Id'
import { CommentDeletedDomainEvent } from '@Media/Comment/domain/Events/CommentDeletedDomainEvent'

export class UpdateMediaOnCommentDeletedHandler implements DomainEventSubscriber <CommentDeletedDomainEvent> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Array<DomainEventClass> {
    return [CommentDeletedDomainEvent]
  }

  async on (domainEvent: CommentDeletedDomainEvent): Promise<void> {
    await this.updater.run(
      new Id(domainEvent.mediaId)
    )
  }
}
