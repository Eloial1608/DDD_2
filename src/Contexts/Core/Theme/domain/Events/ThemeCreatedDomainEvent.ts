import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Theme } from '../Theme'
import { Nullable } from '@Shared/domain/Nullable'
import { LayoutType } from '../ValueObjects/Layout'

type ThemeCreatedDomainEventBody = {
    readonly id: string,
    readonly communityId: Nullable<string>
}

export class ThemeCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.core.theme.v1.created'

  readonly id: string
  readonly communityId: Nullable<string>

  static {
    DomainEvent.derived.add(ThemeCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: ThemeCreatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(ThemeCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
  }

  static fromAggregate (theme: Theme): ThemeCreatedDomainEvent {
    return new ThemeCreatedDomainEvent({
      id: theme.id.valueOf(),
      communityId: theme.communityId ? theme.communityId.valueOf() : null
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
