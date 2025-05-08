import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Lesson } from '../Lesson'

type LessonOrderUpdatedDomainEventBody = {
    readonly id: string
    readonly sectionId: string
    readonly order: number
}

export class LessonOrderUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.quid.section.lesson.v1.order-updated'

  readonly id: string
  readonly sectionId: string
  readonly order: number

  static {
    DomainEvent.derived.add(LessonOrderUpdatedDomainEvent.EVENT_NAME)
  }

  constructor (params: LessonOrderUpdatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(LessonOrderUpdatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.order = params.order
    this.sectionId = params.sectionId
  }

  static fromAggregate (lesson: Lesson): LessonOrderUpdatedDomainEvent {
    return new LessonOrderUpdatedDomainEvent({
      id: lesson.id.valueOf(),
      sectionId: lesson.sectionId.valueOf(),
      order: lesson.order.valueOf()
    })
  }

  toPrimitive (): LessonOrderUpdatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: LessonOrderUpdatedDomainEventBody, eventId: string, occurredOn: Date): LessonOrderUpdatedDomainEvent {
    return new LessonOrderUpdatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
