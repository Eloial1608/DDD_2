import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { SpaceMember } from '../SpaceMember'

type SpaceMemberCreatedDomainEventBody = {
    readonly id: string
    readonly userId: string
    readonly spaceId: string
    readonly isModerator: boolean
}

export class SpaceMemberCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.Marketplace.space-member.v1.created'

  readonly id: string
  readonly userId: string
  readonly spaceId: string
  readonly isModerator: boolean

  static {
    DomainEvent.derived.add(SpaceMemberCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: SpaceMemberCreatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(SpaceMemberCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.userId = params.userId
    this.spaceId = params.spaceId
    this.isModerator = params.isModerator
  }

  static fromAggregate (spaceMember: SpaceMember): SpaceMemberCreatedDomainEvent {
    return new SpaceMemberCreatedDomainEvent({
      id: spaceMember.id.valueOf(),
      userId: spaceMember.userId.valueOf(),
      spaceId: spaceMember.spaceId.valueOf(),
      isModerator: spaceMember.isModerator.valueOf()

    })
  }

  toPrimitive (): SpaceMemberCreatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: SpaceMemberCreatedDomainEventBody, eventId: string, occurredOn: Date): SpaceMemberCreatedDomainEvent {
    return new SpaceMemberCreatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
