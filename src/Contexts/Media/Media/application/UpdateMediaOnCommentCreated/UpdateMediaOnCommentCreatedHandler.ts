import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { Updater } from './Updater'
import { Id } from '@Media/Media/domain/ValueObjects/Id'
import { CommentCreatedDomainEvent } from '@Media/Comment/domain/Events/CommentCreatedDomainEvent'

export class UpdateMediaOnCommentCreatedHandler implements DomainEventSubscriber <CommentCreatedDomainEvent> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Array<DomainEventClass> {
    return [CommentCreatedDomainEvent]
  }

  async on (domainEvent: CommentCreatedDomainEvent): Promise<void> {
    await this.updater.run(
      new Id(domainEvent.mediaId)
    )
  }
}
