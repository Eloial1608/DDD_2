import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Community } from '../Community'

type CommunityCreatedDomainEventBody = {
    readonly id: string
    readonly isPrivate: boolean
}

export class CommunityCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.quid.posts.community.v1.created'

  readonly id: string
  readonly isPrivate: boolean

  static {
    DomainEvent.derived.add(CommunityCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: CommunityCreatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(CommunityCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.isPrivate = params.isPrivate
  }

  static fromAggregate (community: Community): CommunityCreatedDomainEvent {
    return new CommunityCreatedDomainEvent({
      id: community.id.valueOf(),
      isPrivate: community.isPrivate.valueOf()

    })
  }

  toPrimitive (): CommunityCreatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: CommunityCreatedDomainEventBody, eventId: string, occurredOn: Date): CommunityCreatedDomainEvent {
    return new CommunityCreatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
