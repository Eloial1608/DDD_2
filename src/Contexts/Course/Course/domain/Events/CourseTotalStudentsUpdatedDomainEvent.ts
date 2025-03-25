import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Course } from '../Course'

type CourseTotalStudentsUpdatedDomainEventBody = {
  readonly id: string
  readonly communityId: string
  readonly userId: string
  readonly spaceId: string
}

export class CourseTotalStudentsUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.course.course.v1.total-students-updated'

  readonly id: string
  readonly communityId: string
  readonly userId: string
  readonly spaceId: string

  static {
    DomainEvent.derived.add(CourseTotalStudentsUpdatedDomainEvent.EVENT_NAME)
  }

  constructor (params: CourseTotalStudentsUpdatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(CourseTotalStudentsUpdatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
    this.userId = params.userId
    this.spaceId = params.spaceId
  }

  static fromAggregate (course: Course): CourseTotalStudentsUpdatedDomainEvent {
    return new CourseTotalStudentsUpdatedDomainEvent({
      id: course.id.valueOf(),
      communityId: course.communityId.valueOf(),
      userId: course.userId.valueOf(),
      spaceId: course.spaceId.valueOf()

    })
  }

  toPrimitive (): CourseTotalStudentsUpdatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: CourseTotalStudentsUpdatedDomainEventBody, eventId: string, occurredOn: Date): CourseTotalStudentsUpdatedDomainEvent {
    return new CourseTotalStudentsUpdatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
