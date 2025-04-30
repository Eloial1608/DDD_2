import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Section } from '../Section'

type SectionTotalLessonsUpdatedDomainEventBody = {
    readonly id: string
    readonly courseId: string
}

export class SectionTotalLessonsUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.quid.Course.section.v1.total-lessons-updated'

  readonly id: string
  readonly courseId: string

  static {
    DomainEvent.derived.add(SectionTotalLessonsUpdatedDomainEvent.EVENT_NAME)
  }

  constructor (params: SectionTotalLessonsUpdatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(SectionTotalLessonsUpdatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.courseId = params.courseId
  }

  static fromAggregate (section: Section): SectionTotalLessonsUpdatedDomainEvent {
    return new SectionTotalLessonsUpdatedDomainEvent({
      id: section.id.valueOf(),
      courseId: section.courseId.valueOf()

    })
  }

  toPrimitive (): SectionTotalLessonsUpdatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: SectionTotalLessonsUpdatedDomainEventBody, eventId: string, occurredOn: Date): SectionTotalLessonsUpdatedDomainEvent {
    return new SectionTotalLessonsUpdatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
