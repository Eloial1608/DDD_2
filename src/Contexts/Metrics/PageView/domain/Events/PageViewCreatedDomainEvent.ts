import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { PageView } from '../PageView'

type PageViewCreatedDomainEventBody = {
  readonly id: string
  readonly userId: string
  readonly communityId: string
  readonly spaceId: string
  readonly createdAt: Date
}

export class PageViewCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.Metrics.pageview.v1.created'

  readonly id: string
  readonly userId: string
  readonly communityId: string
  readonly spaceId: string
  readonly createdAt: Date

  static {
    DomainEvent.derived.add(PageViewCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: PageViewCreatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(PageViewCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
    this.userId = params.userId
    this.spaceId = params.spaceId
    this.createdAt = params.createdAt
  }

  static fromAggregate (pageview: PageView): PageViewCreatedDomainEvent {
    return new PageViewCreatedDomainEvent({
      id: pageview.id.valueOf(),
      communityId: pageview.communityId.valueOf(),
      userId: pageview.userId.valueOf(),
      spaceId: pageview.spaceId.valueOf(),
      createdAt: pageview.createdAt.valueOf()
    })
  }

  toPrimitive (): PageViewCreatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: PageViewCreatedDomainEventBody, eventId: string, occurredOn: Date): PageViewCreatedDomainEvent {
    return new PageViewCreatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
