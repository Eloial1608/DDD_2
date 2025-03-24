import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Lesson } from '../Lesson'

type LessonDeletedDomainEventBody = {
    readonly id: string
    readonly sectionId: string
}

export class LessonDeletedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.quid.Course.lesson.v1.deleted'

  readonly id: string
  readonly sectionId: string

  static {
    DomainEvent.derived.add(LessonDeletedDomainEvent.EVENT_NAME)
  }

  constructor (params: LessonDeletedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(LessonDeletedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.sectionId = params.sectionId
  }

  static fromAggregate (lesson: Lesson): LessonDeletedDomainEvent {
    return new LessonDeletedDomainEvent({
      id: lesson.id.valueOf(),
      sectionId: lesson.sectionId.valueOf()
    })
  }

  toPrimitive (): LessonDeletedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: LessonDeletedDomainEventBody, eventId: string, occurredOn: Date): LessonDeletedDomainEvent {
    return new LessonDeletedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
