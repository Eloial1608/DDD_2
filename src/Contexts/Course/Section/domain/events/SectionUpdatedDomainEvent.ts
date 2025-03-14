import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Section } from '../Section'

type SectionUpdatedDomainEventBody = {
    readonly id: string
    readonly courseId: string
}

export class SectionUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.quid.course.section.v1.updated'

  readonly id: string
  readonly courseId: string

  static {
    DomainEvent.derived.add(SectionUpdatedDomainEvent.EVENT_NAME)
  }

  constructor (params: SectionUpdatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(SectionUpdatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.courseId = params.courseId
  }

  static fromAggregate (section: Section): SectionUpdatedDomainEvent {
    return new SectionUpdatedDomainEvent({
      id: section.id.valueOf(),
      courseId: section.courseId.valueOf()
    })
  }

  toPrimitive (): SectionUpdatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: SectionUpdatedDomainEventBody, eventId: string, occurredOn: Date): SectionUpdatedDomainEvent {
    return new SectionUpdatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
