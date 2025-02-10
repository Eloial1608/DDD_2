import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Section } from '@Course/Section/domain/Section'

type SectionCreatedDomainEventBody = {
    readonly id: string
    readonly courseId: string
    readonly title: string
}

export class SectionCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.quid.course.section.v1.created'

  readonly id: string
  readonly courseId: string
  readonly title: string

  static {
    DomainEvent.derived.add(SectionCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: SectionCreatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(SectionCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.courseId = params.courseId
    this.title = params.title
  }

  static fromAggregate (section: Section): SectionCreatedDomainEvent {
    return new SectionCreatedDomainEvent({
      id: section.id.valueOf(),
      courseId: section.courseId.valueOf(),
      title: section.title.valueOf()

    })
  }

  toPrimitive (): SectionCreatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: SectionCreatedDomainEventBody, eventId: string, occurredOn: Date): SectionCreatedDomainEvent {
    return new SectionCreatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
