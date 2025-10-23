import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { UserRetention } from '../UserRetention'

type UserRetentionCreatedDomainEventBody = {
    readonly id: string
    readonly userId: string
    readonly communityId: string
}

export class UserRetentionCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.metrics.userretention.v1.created'

  readonly id: string
  readonly userId: string
  readonly communityId: string

  static {
    DomainEvent.derived.add(UserRetentionCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: UserRetentionCreatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(UserRetentionCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.userId = params.userId
    this.communityId = params.communityId
  }

  static fromAggregate (userretention: UserRetention): UserRetentionCreatedDomainEvent {
    return new UserRetentionCreatedDomainEvent({
      id: userretention.id.valueOf(),
      communityId: userretention.communityId.valueOf(),
      userId: userretention.userId.valueOf()

    })
  }

  toPrimitive (): UserRetentionCreatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: UserRetentionCreatedDomainEventBody, eventId: string, occurredOn: Date): UserRetentionCreatedDomainEvent {
    return new UserRetentionCreatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
