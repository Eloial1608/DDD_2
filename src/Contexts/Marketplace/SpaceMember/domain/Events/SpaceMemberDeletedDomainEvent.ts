import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { SpaceMember } from '../SpaceMember'

type SpaceMemberDeletedDomainEventBody = {
    readonly id: string
    readonly userId: string
    readonly spaceId: string
    readonly isModerator: boolean
}

export class SpaceMemberDeletedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.Marketplace.space-member.v1.deleted'

  readonly id: string
  readonly userId: string
  readonly spaceId: string
  readonly isModerator: boolean

  static {
    DomainEvent.derived.add(SpaceMemberDeletedDomainEvent.EVENT_NAME)
  }

  constructor (params: SpaceMemberDeletedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(SpaceMemberDeletedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.userId = params.userId
    this.spaceId = params.spaceId
    this.isModerator = params.isModerator
  }

  static fromAggregate (spaceMember: SpaceMember): SpaceMemberDeletedDomainEvent {
    return new SpaceMemberDeletedDomainEvent({
      id: spaceMember.id.valueOf(),
      userId: spaceMember.userId.valueOf(),
      spaceId: spaceMember.spaceId.valueOf(),
      isModerator: spaceMember.isModerator.valueOf()

    })
  }

  toPrimitive (): SpaceMemberDeletedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: SpaceMemberDeletedDomainEventBody, eventId: string, occurredOn: Date): SpaceMemberDeletedDomainEvent {
    return new SpaceMemberDeletedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
