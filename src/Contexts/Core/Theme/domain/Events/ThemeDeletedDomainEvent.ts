import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Theme } from '../Theme'

type ThemeDeletedDomainEventBody = {
    readonly id: string
    readonly postId: string
    readonly userId: string
    readonly createdAt: Date
}

export class ThemeDeletedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.core.theme.v1.deleted'

  readonly id: string
  readonly postId: string
  readonly userId: string
  readonly createdAt: Date

  static {
    DomainEvent.derived.add(ThemeDeletedDomainEvent.EVENT_NAME)
  }

  constructor (params: ThemeDeletedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(ThemeDeletedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.userId = params.userId
    this.postId = params.postId
    this.createdAt = params.createdAt
  }

  static fromAggregate (theme: Theme): ThemeDeletedDomainEvent {
    return new ThemeDeletedDomainEvent({
      id: theme.id.valueOf(),
      postId: theme.postId.valueOf(),
      createdAt: theme.createdAt.valueOf(),
      userId: theme.userId.valueOf()

    })
  }

  toPrimitive (): ThemeDeletedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: ThemeDeletedDomainEventBody, eventId: string, occurredOn: Date): ThemeDeletedDomainEvent {
    return new ThemeDeletedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
