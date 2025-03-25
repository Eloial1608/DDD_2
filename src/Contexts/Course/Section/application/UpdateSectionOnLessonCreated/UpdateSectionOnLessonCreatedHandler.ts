import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { Updater } from './Updater'
import { Id } from '@Course/Section/domain/ValueObjects/Id'
import { LessonCreatedDomainEvent } from '@Course/Lesson/domain/Events/LessonCreatedDomainEvent'

export class UpdateSectionOnLessonCreatedHandler implements DomainEventSubscriber <LessonCreatedDomainEvent> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Array<DomainEventClass> {
    return [LessonCreatedDomainEvent]
  }

  async on (domainEvent: LessonCreatedDomainEvent): Promise<void> {
    await this.updater.run(
      new Id(domainEvent.sectionId)
    )
  }
}
