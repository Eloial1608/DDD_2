import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Lesson } from '../Lesson'

type LessonCreatedDomainEventBody = {
  readonly id: string
  readonly sectionId: string
  readonly title: string
  readonly type: string
  readonly content: string
}

export class LessonCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.quid.course.lesson.v1.created'

  readonly id: string
  readonly sectionId: string
  readonly title: string
  readonly type: string
  readonly content: string

  static {
    DomainEvent.derived.add(LessonCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: LessonCreatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(LessonCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.sectionId = params.sectionId
    this.title = params.title
    this.type = params.type
    this.content = params.content
  }

  static fromAggregate (lesson: Lesson): LessonCreatedDomainEvent {
    return new LessonCreatedDomainEvent({
      id: lesson.id.valueOf(),
      sectionId: lesson.sectionId.valueOf(),
      title: lesson.title.valueOf(),
      type: lesson.type.valueOf(),
      content: lesson.content.valueOf(),
    })
  }

  toPrimitive (): LessonCreatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: LessonCreatedDomainEventBody, eventId: string, occurredOn: Date): LessonCreatedDomainEvent {
    return new LessonCreatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
