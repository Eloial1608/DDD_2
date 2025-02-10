import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Course } from '../Course'
import { Nullable } from '@Shared/domain/Nullable'

type CourseUpdatedDomainEventBody = {
    readonly id: string
    readonly communityId: string
    readonly userId: string
    readonly title: string
    readonly bannerUrl: Nullable<string>
}

export class CourseUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.quid.course.course.v1.updated'

  readonly id: string
  readonly communityId: string
  readonly userId: string
  readonly title: string
  readonly bannerUrl: Nullable<string>

  static {
    DomainEvent.derived.add(CourseUpdatedDomainEvent.EVENT_NAME)
  }

  constructor (params: CourseUpdatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(CourseUpdatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
    this.userId = params.userId
    this.title = params.title
    this.bannerUrl = params.bannerUrl
  }

  static fromAggregate (course: Course): CourseUpdatedDomainEvent {
    return new CourseUpdatedDomainEvent({
      id: course.id.valueOf(),
      communityId: course.communityId.valueOf(),
      userId: course.userId.valueOf(),
      title: course.title.valueOf(),
      bannerUrl: course.bannerUrl?.valueOf()
    })
  }

  toPrimitive (): CourseUpdatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: CourseUpdatedDomainEventBody, eventId: string, occurredOn: Date): CourseUpdatedDomainEvent {
    return new CourseUpdatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
