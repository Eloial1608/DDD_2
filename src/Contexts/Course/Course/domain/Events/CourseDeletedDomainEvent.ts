import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Course } from '../Course'

type CourseDeletedDomainEventBody = {
    readonly id: string
    readonly communityId: string
    readonly userId: string
    readonly spaceId: string
}

export class CourseDeletedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.quid.Course.course.v1.deleted'

  readonly id: string
  readonly communityId: string
  readonly userId: string
  readonly spaceId: string

  static {
    DomainEvent.derived.add(CourseDeletedDomainEvent.EVENT_NAME)
  }

  constructor (params: CourseDeletedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(CourseDeletedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
    this.userId = params.userId
    this.spaceId = params.spaceId
  }

  static fromAggregate (course: Course): CourseDeletedDomainEvent {
    return new CourseDeletedDomainEvent({
      id: course.id.valueOf(),
      communityId: course.communityId.valueOf(),
      userId: course.userId.valueOf(),
      spaceId: course.spaceId.valueOf()

    })
  }

  toPrimitive (): CourseDeletedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: CourseDeletedDomainEventBody, eventId: string, occurredOn: Date): CourseDeletedDomainEvent {
    return new CourseDeletedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
