import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Theme } from '../Theme'

type ThemeCreatedDomainEventBody = {
    readonly id: string
    readonly postId: string
    readonly userId: string
    readonly createdAt: Date
}

export class ThemeCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.core.theme.v1.created'

  readonly id: string
  readonly postId: string
  readonly userId: string
  readonly createdAt: Date

  static {
    DomainEvent.derived.add(ThemeCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: ThemeCreatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(ThemeCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.userId = params.userId
    this.postId = params.postId
    this.createdAt = params.createdAt
  }

  static fromAggregate (theme: Theme): ThemeCreatedDomainEvent {
    return new ThemeCreatedDomainEvent({
      id: theme.id.valueOf(),
      postId: theme.postId.valueOf(),
      createdAt: theme.createdAt.valueOf(),
      userId: theme.userId.valueOf()

    })
  }

  toPrimitive (): ThemeCreatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: ThemeCreatedDomainEventBody, eventId: string, occurredOn: Date): ThemeCreatedDomainEvent {
    return new ThemeCreatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
