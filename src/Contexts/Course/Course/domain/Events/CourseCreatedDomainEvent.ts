import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Course } from '../Course'
import { Nullable } from '@Shared/domain/Nullable'

type CourseCreatedDomainEventBody = {
    readonly id: string
    readonly communityId: string
    readonly userId: string
    readonly title: string
    readonly bannerUrl: Nullable<string>
}

export class CourseCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.quid.Course.course.v1.created'

  readonly id: string
  readonly communityId: string
  readonly userId: string
  readonly title: string
  readonly bannerUrl: Nullable<string>

  static {
    DomainEvent.derived.add(CourseCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: CourseCreatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(CourseCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
    this.userId = params.userId
    this.title = params.title
    this.bannerUrl = params.bannerUrl
  }

  static fromAggregate (course: Course): CourseCreatedDomainEvent {
    return new CourseCreatedDomainEvent({
      id: course.id.valueOf(),
      communityId: course.communityId.valueOf(),
      userId: course.userId.valueOf(),
      title: course.title.valueOf(),
      bannerUrl: course.bannerUrl?.valueOf()
    })
  }

  toPrimitive (): CourseCreatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: CourseCreatedDomainEventBody, eventId: string, occurredOn: Date): CourseCreatedDomainEvent {
    return new CourseCreatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
