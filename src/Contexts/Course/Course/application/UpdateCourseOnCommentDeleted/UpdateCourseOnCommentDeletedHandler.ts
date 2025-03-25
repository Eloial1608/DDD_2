import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { Updater } from './Updater'
import { Id } from '@Course/Course/domain/ValueObjects/Id'
import { CommentDeletedDomainEvent } from '@Course/Comment/domain/Events/CommentDeletedDomainEvent'

export class UpdateCourseOnCommentDeletedHandler implements DomainEventSubscriber <CommentDeletedDomainEvent> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Array<DomainEventClass> {
    return [CommentDeletedDomainEvent]
  }

  async on (domainEvent: CommentDeletedDomainEvent): Promise<void> {
    await this.updater.run(
      new Id(domainEvent.courseId)
    )
  }
}
