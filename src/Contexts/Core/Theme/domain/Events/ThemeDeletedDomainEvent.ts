import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Theme } from '../Theme'
import { Nullable } from '@Shared/domain/Nullable'

type ThemeDeletedDomainEventBody = {
    readonly id: string,
    readonly communityId: Nullable<string>
}

export class ThemeDeletedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.core.theme.v1.deleted'

  readonly id: string
  readonly communityId: Nullable<string>

  static {
    DomainEvent.derived.add(ThemeDeletedDomainEvent.EVENT_NAME)
  }

  constructor (params: ThemeDeletedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(ThemeDeletedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
  }

  static fromAggregate (theme: Theme): ThemeDeletedDomainEvent {
    return new ThemeDeletedDomainEvent({
      id: theme.id.valueOf(),
      communityId: theme.communityId ? theme.communityId.valueOf() : null
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
