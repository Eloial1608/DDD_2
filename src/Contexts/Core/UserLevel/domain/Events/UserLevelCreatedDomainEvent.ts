import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { UserLevel } from '../UserLevel'

type UserLevelCreatedDomainEventBody = {
    readonly id: string
    readonly communityId: string
    readonly userId: string
    readonly currentExp: number
    readonly createdAt: Date
}

export class UserLevelCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.user-level.v1.created'

  readonly id: string
  readonly communityId: string
  readonly userId: string
  readonly currentExp: number
  readonly createdAt: Date

  static {
    DomainEvent.derived.add(UserLevelCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: UserLevelCreatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(UserLevelCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
    this.userId = params.userId
    this.currentExp = params.currentExp
    this.createdAt = params.createdAt
  }

  static fromAggregate (userLevel: UserLevel): UserLevelCreatedDomainEvent {
    return new UserLevelCreatedDomainEvent({
      id: userLevel.id.valueOf(),
      communityId: userLevel.id.valueOf(),
      userId: userLevel.userId.valueOf(),
      currentExp: userLevel.currentExp.valueOf(),
      createdAt: userLevel.createdAt.valueOf()
    })
  }

  toPrimitive (): UserLevelCreatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: UserLevelCreatedDomainEventBody, eventId: string, occurredOn: Date): UserLevelCreatedDomainEvent {
    return new UserLevelCreatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
