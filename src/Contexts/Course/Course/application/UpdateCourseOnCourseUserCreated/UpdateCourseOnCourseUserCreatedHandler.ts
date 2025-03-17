import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { Updater } from './Updater'
import { Id } from '@Course/Course/domain/ValueObjects/Id'
import { CourseUserCreatedDomainEvent } from '@Course/CourseUser/domain/Events/CourseUserCreatedDomainEvent'

export class UpdateCourseOnCourseUserCreatedHandler implements DomainEventSubscriber <CourseUserCreatedDomainEvent> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Array<DomainEventClass> {
    return [CourseUserCreatedDomainEvent]
  }

  async on (domainEvent: CourseUserCreatedDomainEvent): Promise<void> {
    await this.updater.run(
      new Id(domainEvent.courseId)
    )
  }
}
