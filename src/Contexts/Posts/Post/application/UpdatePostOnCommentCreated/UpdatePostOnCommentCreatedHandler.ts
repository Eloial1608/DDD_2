import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { Updater } from './Updater'
import { Id } from '@Posts/Post/domain/ValueObjects/Id'
import { CommentCreatedDomainEvent } from '@Posts/Comment/domain/Events/CommentCreatedDomainEvent'

export class UpdatePostOnCommentCreatedHandler implements DomainEventSubscriber <CommentCreatedDomainEvent> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Array<DomainEventClass> {
    return [CommentCreatedDomainEvent]
  }

  async on (domainEvent: CommentCreatedDomainEvent): Promise<void> {
    await this.updater.run(
      new Id(domainEvent.postId)
    )
  }
}
