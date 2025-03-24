import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Lesson } from '../Lesson'

type LessonUpdatedDomainEventBody = {
    readonly id: string
    readonly sectionId: string
}

export class LessonUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.quid.section.lesson.v1.updated'

  readonly id: string
  readonly sectionId: string

  static {
    DomainEvent.derived.add(LessonUpdatedDomainEvent.EVENT_NAME)
  }

  constructor (params: LessonUpdatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(LessonUpdatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.sectionId = params.sectionId
  }

  static fromAggregate (lesson: Lesson): LessonUpdatedDomainEvent {
    return new LessonUpdatedDomainEvent({
      id: lesson.id.valueOf(),
      sectionId: lesson.sectionId.valueOf()
    })
  }

  toPrimitive (): LessonUpdatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: LessonUpdatedDomainEventBody, eventId: string, occurredOn: Date): LessonUpdatedDomainEvent {
    return new LessonUpdatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
