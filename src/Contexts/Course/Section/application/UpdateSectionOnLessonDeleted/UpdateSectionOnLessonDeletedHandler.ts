import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { Updater } from './Updater'
import { Id } from '@Course/Section/domain/ValueObjects/Id'
import { LessonDeletedDomainEvent } from '@Course/Lesson/domain/Events/LessonDeletedDomainEvent'

export class UpdateSectionOnLessonDeletedHandler implements DomainEventSubscriber <LessonDeletedDomainEvent> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Array<DomainEventClass> {
    return [LessonDeletedDomainEvent]
  }

  async on (domainEvent: LessonDeletedDomainEvent): Promise<void> {
    await this.updater.run(
      new Id(domainEvent.sectionId)
    )
  }
}
