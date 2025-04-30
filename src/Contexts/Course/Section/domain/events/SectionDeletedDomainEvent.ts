import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Section } from '../Section'

type SectionDeletedDomainEventBody = {
    readonly id: string
    readonly courseId: string
}

export class SectionDeletedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.Course.section.v1.deleted'

  readonly id: string
  readonly courseId: string

  static {
    DomainEvent.derived.add(SectionDeletedDomainEvent.EVENT_NAME)
  }

  constructor (params: SectionDeletedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(SectionDeletedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.courseId = params.courseId
  }

  static fromAggregate (section: Section): SectionDeletedDomainEvent {
    return new SectionDeletedDomainEvent({
      id: section.id.valueOf(),
      courseId: section.courseId.valueOf()
    })
  }

  toPrimitive (): SectionDeletedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: SectionDeletedDomainEventBody, eventId: string, occurredOn: Date): SectionDeletedDomainEvent {
    return new SectionDeletedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
