import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Nullable } from '@Shared/domain/Nullable'
import { Theme } from '../Theme'

type ThemeUpdatedDomainEventBody = {
    readonly id: string,
    readonly communityId: Nullable<string>
}

export class ThemeUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.themes.theme.v1.updated'

  readonly id: string
  readonly communityId: Nullable<string>

  static {
    DomainEvent.derived.add(ThemeUpdatedDomainEvent.EVENT_NAME)
  }

  constructor (params: ThemeUpdatedDomainEventBody & {eventId?: string, occurredOn?: Date}) {
    super(ThemeUpdatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
  }

  static fromAggregate (theme: Theme): ThemeUpdatedDomainEvent {
    return new ThemeUpdatedDomainEvent({
      id: theme.id.valueOf(),
      communityId: theme.communityId ? theme.communityId.valueOf() : null
    })
  }

  toPrimitive (): ThemeUpdatedDomainEvent {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: ThemeUpdatedDomainEventBody, eventId: string, occurredOn: Date): ThemeUpdatedDomainEvent {
    return new ThemeUpdatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
