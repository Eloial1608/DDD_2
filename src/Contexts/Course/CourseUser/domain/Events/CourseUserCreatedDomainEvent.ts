import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { CourseUser } from '../CourseUser'

type CourseUserCreatedDomainEventBody = {
    readonly id: string
    readonly userId: string
    readonly courseId: string
    readonly createdAt: Date
}

export class CourseUserCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.course.course-user.v1.created'

  readonly id: string
  readonly userId: string
  readonly courseId: string
  readonly createdAt: Date

  static {
    DomainEvent.derived.add(CourseUserCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: CourseUserCreatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(CourseUserCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.userId = params.userId
    this.courseId = params.courseId
    this.createdAt = params.createdAt
  }

  static fromAggregate (courseUser: CourseUser): CourseUserCreatedDomainEvent {
    return new CourseUserCreatedDomainEvent({
      id: courseUser.id.valueOf(),
      userId: courseUser.userId.valueOf(),
      courseId: courseUser.courseId.valueOf(),
      createdAt: courseUser.createdAt.valueOf()
    })
  }

  toPrimitive (): CourseUserCreatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: CourseUserCreatedDomainEventBody, eventId: string, occurredOn: Date): CourseUserCreatedDomainEvent {
    return new CourseUserCreatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
