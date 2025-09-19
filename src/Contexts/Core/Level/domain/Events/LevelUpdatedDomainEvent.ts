import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Level } from '../Level'

type LevelUpdatedDomainEventBody = {
  readonly id: string,
  readonly communityId: string,
  readonly levelNumber: number,
  readonly minimumExp: number,
  readonly createdAt: Date,
  readonly updatedAt: Date
}

export class LevelUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.level.v1.updated'

  readonly id: string
  readonly communityId: string
  readonly levelNumber: number
  readonly minimumExp: number
  readonly createdAt: Date
  readonly updatedAt: Date

  static {
    DomainEvent.derived.add(LevelUpdatedDomainEvent.EVENT_NAME)
  }

  constructor (params: LevelUpdatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(LevelUpdatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
    this.levelNumber = params.levelNumber
    this.minimumExp = params.minimumExp
    this.createdAt = params.createdAt
    this.updatedAt = params.updatedAt
  }

  static fromAggregate (planForUsers: Level): LevelUpdatedDomainEvent {
    return new LevelUpdatedDomainEvent({
      id: planForUsers.id.valueOf(),
      communityId: planForUsers.communityId.valueOf(),
      levelNumber: planForUsers.levelNumber.valueOf(),
      minimumExp: planForUsers.minimumExp.valueOf(),
      createdAt: planForUsers.createdAt.valueOf(),
      updatedAt: planForUsers.updatedAt.valueOf()
    })
  }

  toPrimitive (): LevelUpdatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: LevelUpdatedDomainEventBody, eventId: string, occurredOn: Date): LevelUpdatedDomainEvent {
    return new LevelUpdatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
