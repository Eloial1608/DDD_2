import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Level } from '../Level'

type LevelCreatedDomainEventBody = {
    readonly id: string
    readonly communityId: string
    readonly levelNumber: number
    readonly minimumExp: number
    readonly createdAt: Date
    readonly updatedAt: Date
}

export class LevelCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.level.v1.created'

  readonly id: string
  readonly communityId: string
  readonly levelNumber: number
  readonly minimumExp: number
  readonly createdAt: Date
  readonly updatedAt: Date

  static {
    DomainEvent.derived.add(LevelCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: LevelCreatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(LevelCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
    this.levelNumber = params.levelNumber
    this.minimumExp = params.minimumExp
    this.createdAt = params.createdAt
    this.updatedAt = params.updatedAt
  }

  static fromAggregate (level: Level): LevelCreatedDomainEvent {
    return new LevelCreatedDomainEvent({
      id: level.id.valueOf(),
      communityId: level.id.valueOf(),
      levelNumber: level.levelNumber.valueOf(),
      minimumExp: level.minimumExp.valueOf(),
      createdAt: level.createdAt.valueOf(),
      updatedAt: level.updatedAt.valueOf()

    })
  }

  toPrimitive (): LevelCreatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: LevelCreatedDomainEventBody, eventId: string, occurredOn: Date): LevelCreatedDomainEvent {
    return new LevelCreatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
