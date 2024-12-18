import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Nullable } from '@Shared/domain/Nullable'
import { SpaceMember } from '../SpaceMember'

type SpaceMemberModeratorUpdatedDomainEventBody = {
    readonly id: string
    readonly userId: string
    readonly spaceId: string
    readonly communityId: string
    readonly invitedBy: Nullable<string>
    readonly invitedAt: Nullable<Date>
    readonly isModerator: boolean
    readonly isBanned: boolean
    readonly createdAt: Date
    readonly updatedAt: Date
}

export class SpaceMemberModeratorUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.quid.space-member.v1.is-moderator-updated'

  readonly id: string
  readonly userId: string
  readonly spaceId: string
  readonly communityId: string
  readonly invitedBy: Nullable<string>
  readonly invitedAt: Nullable<Date>
  readonly isModerator: boolean
  readonly isBanned: boolean
  readonly createdAt: Date
  readonly updatedAt: Date

  static {
    DomainEvent.derived.add(SpaceMemberModeratorUpdatedDomainEvent.EVENT_NAME)
  }

  constructor (params: SpaceMemberModeratorUpdatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(SpaceMemberModeratorUpdatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.createdAt = params.createdAt
    this.updatedAt = params.updatedAt
    this.userId = params.userId
    this.spaceId = params.spaceId
    this.isModerator = params.isModerator
    this.isBanned = params.isBanned
    this.communityId = params.communityId
    this.invitedAt = params.invitedAt
    this.invitedBy = params.invitedBy
  }

  static fromAggregate (spaceMember: SpaceMember): SpaceMemberModeratorUpdatedDomainEvent {
    return new SpaceMemberModeratorUpdatedDomainEvent({
      id: spaceMember.id.valueOf(),
      createdAt: spaceMember.createdAt.valueOf(),
      updatedAt: spaceMember.updatedAt.valueOf(),
      userId: spaceMember.userId.valueOf(),
      spaceId: spaceMember.spaceId.valueOf(),
      isModerator: spaceMember.isModerator.valueOf(),
      isBanned: spaceMember.isBanned.valueOf(),
      invitedBy: spaceMember.invitedBy?.valueOf(),
      invitedAt: spaceMember.invitedAt?.valueOf(),
      communityId: spaceMember.communityId.valueOf()

    })
  }

  toPrimitive (): SpaceMemberModeratorUpdatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: SpaceMemberModeratorUpdatedDomainEventBody, eventId: string, occurredOn: Date): SpaceMemberModeratorUpdatedDomainEvent {
    return new SpaceMemberModeratorUpdatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
