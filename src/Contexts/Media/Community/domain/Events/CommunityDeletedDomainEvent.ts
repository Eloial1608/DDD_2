import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Community } from '../Community'

type CommunityDeletedDomainEventBody = {
    readonly id: string
    readonly isPrivate: boolean
}

export class CommunityDeletedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.Media.community.v1.deleted'

  readonly id: string
  readonly isPrivate: boolean

  static {
    DomainEvent.derived.add(CommunityDeletedDomainEvent.EVENT_NAME)
  }

  constructor (params: CommunityDeletedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(CommunityDeletedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.isPrivate = params.isPrivate
  }

  static fromAggregate (community: Community): CommunityDeletedDomainEvent {
    return new CommunityDeletedDomainEvent({
      id: community.id.valueOf(),
      isPrivate: community.isPrivate.valueOf()

    })
  }

  toPrimitive (): CommunityDeletedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: CommunityDeletedDomainEventBody, eventId: string, occurredOn: Date): CommunityDeletedDomainEvent {
    return new CommunityDeletedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
