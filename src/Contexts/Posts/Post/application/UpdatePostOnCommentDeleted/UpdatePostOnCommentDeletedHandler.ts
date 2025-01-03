import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { Updater } from './Updater'
import { Id } from '@Posts/Post/domain/ValueObjects/Id'
import { CommentDeletedDomainEvent } from '@Posts/Comment/domain/Events/CommentDeletedDomainEvent'

export class UpdatePostOnCommentDeletedHandler implements DomainEventSubscriber <CommentDeletedDomainEvent> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Array<DomainEventClass> {
    return [CommentDeletedDomainEvent]
  }

  async on (domainEvent: CommentDeletedDomainEvent): Promise<void> {
    await this.updater.run(
      new Id(domainEvent.postId)
    )
  }
}
