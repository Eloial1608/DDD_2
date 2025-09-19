import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { UserLevel } from '../UserLevel'

type UserLevelDeletedDomainEventBody = {
    readonly id: string
    readonly communityId: string
    readonly userId: string
    readonly levelId: string
    readonly currentExp: number
}

export class UserLevelDeletedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.user-level.v1.deleted'

  readonly id: string
  readonly communityId: string
  readonly userId: string
  readonly levelId: string
  readonly currentExp: number

  static {
    DomainEvent.derived.add(UserLevelDeletedDomainEvent.EVENT_NAME)
  }

  constructor (params: UserLevelDeletedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(UserLevelDeletedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
    this.userId = params.userId
    this.levelId = params.levelId
    this.currentExp = params.currentExp
  }

  static fromAggregate (userLevel: UserLevel): UserLevelDeletedDomainEvent {
    return new UserLevelDeletedDomainEvent({
      id: userLevel.id.valueOf(),
      communityId: userLevel.communityId.valueOf(),
      userId: userLevel.userId.valueOf(),
      levelId: userLevel.levelId.valueOf(),
      currentExp: userLevel.currentExp.valueOf()
    })
  }

  toPrimitive (): UserLevelDeletedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: UserLevelDeletedDomainEventBody, eventId: string, occurredOn: Date): UserLevelDeletedDomainEvent {
    return new UserLevelDeletedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
