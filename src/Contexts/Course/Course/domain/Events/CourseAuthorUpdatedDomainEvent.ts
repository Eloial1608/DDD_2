import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Course } from '../Course'
import { Nullable } from '@Shared/domain/Nullable'

type CourseAuthorUpdatedDomainEventBody = {
    readonly id: string
    readonly communityId: string
    readonly userId: string
    readonly title: string
    readonly bannerUrl: Nullable<string>
}

export class CourseAuthorUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.quid.course.course.v1.total-likes-updated'

  readonly id: string
  readonly communityId: string
  readonly userId: string
  readonly title: string
  readonly bannerUrl: Nullable<string>

  static {
    DomainEvent.derived.add(CourseAuthorUpdatedDomainEvent.EVENT_NAME)
  }

  constructor (params: CourseAuthorUpdatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(CourseAuthorUpdatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
    this.userId = params.userId
    this.title = params.title
    this.bannerUrl = params.bannerUrl
  }

  static fromAggregate (course: Course): CourseAuthorUpdatedDomainEvent {
    return new CourseAuthorUpdatedDomainEvent({
      id: course.id.valueOf(),
      communityId: course.communityId.valueOf(),
      userId: course.userId.valueOf(),
      title: course.title.valueOf(),
      bannerUrl: course.bannerUrl?.valueOf()

    })
  }

  toPrimitive (): CourseAuthorUpdatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: CourseAuthorUpdatedDomainEventBody, eventId: string, occurredOn: Date): CourseAuthorUpdatedDomainEvent {
    return new CourseAuthorUpdatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
