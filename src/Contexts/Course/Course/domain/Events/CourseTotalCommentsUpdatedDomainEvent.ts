import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Course } from '../Course'

type CourseTotalCommentsUpdatedDomainEventBody = {
  readonly id: string
  readonly communityId: string
  readonly userId: string
  readonly spaceId: string
}

export class CourseTotalCommentsUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.quid.Course.course.v1.total-comments-updated'

  readonly id: string
  readonly communityId: string
  readonly userId: string
  readonly spaceId: string

  static {
    DomainEvent.derived.add(CourseTotalCommentsUpdatedDomainEvent.EVENT_NAME)
  }

  constructor (params: CourseTotalCommentsUpdatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(CourseTotalCommentsUpdatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
    this.userId = params.userId
    this.spaceId = params.spaceId
  }

  static fromAggregate (course: Course): CourseTotalCommentsUpdatedDomainEvent {
    return new CourseTotalCommentsUpdatedDomainEvent({
      id: course.id.valueOf(),
      communityId: course.communityId.valueOf(),
      userId: course.userId.valueOf(),
      spaceId: course.spaceId.valueOf()

    })
  }

  toPrimitive (): CourseTotalCommentsUpdatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: CourseTotalCommentsUpdatedDomainEventBody, eventId: string, occurredOn: Date): CourseTotalCommentsUpdatedDomainEvent {
    return new CourseTotalCommentsUpdatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
