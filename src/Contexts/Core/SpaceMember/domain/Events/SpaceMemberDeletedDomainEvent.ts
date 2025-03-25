import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Nullable } from '@Shared/domain/Nullable'
import { SpaceMember } from '../SpaceMember'

type SpaceMemberDeletedDomainEventBody = {
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
    readonly deletedAt: Date
}

export class SpaceMemberDeletedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.space-member.v1.deleted'

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
  readonly deletedAt: Date

  static {
    DomainEvent.derived.add(SpaceMemberDeletedDomainEvent.EVENT_NAME)
  }

  constructor (params: SpaceMemberDeletedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(SpaceMemberDeletedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

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
    this.deletedAt = params.deletedAt
  }

  static fromAggregate (spaceMember: SpaceMember): SpaceMemberDeletedDomainEvent {
    return new SpaceMemberDeletedDomainEvent({
      id: spaceMember.id.valueOf(),
      createdAt: spaceMember.createdAt.valueOf(),
      updatedAt: spaceMember.updatedAt.valueOf(),
      userId: spaceMember.userId.valueOf(),
      spaceId: spaceMember.spaceId.valueOf(),
      isModerator: spaceMember.isModerator.valueOf(),
      isBanned: spaceMember.isBanned.valueOf(),
      invitedBy: spaceMember.invitedBy?.valueOf(),
      invitedAt: spaceMember.invitedAt?.valueOf(),
      communityId: spaceMember.communityId.valueOf(),
      deletedAt: spaceMember.deletedAt!.valueOf()

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
