import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Nullable } from '@Shared/domain/Nullable'
import { SpaceMember } from '../SpaceMember'

type SpaceMemberCreatedDomainEventBody = {
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

export class SpaceMemberCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.space-member.v1.created'

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
    DomainEvent.derived.add(SpaceMemberCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: SpaceMemberCreatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(SpaceMemberCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

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

  static fromAggregate (spaceMember: SpaceMember): SpaceMemberCreatedDomainEvent {
    return new SpaceMemberCreatedDomainEvent({
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
