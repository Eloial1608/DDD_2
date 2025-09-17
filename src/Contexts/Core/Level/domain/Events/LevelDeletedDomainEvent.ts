import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Level } from '../Level'

type LevelDeletedDomainEventBody = {
    readonly id: string
    readonly communityId: string
    readonly levelNumber: number
    readonly minimumExp: number
}

export class LevelDeletedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.level.v1.deleted'

  readonly id: string
  readonly communityId: string
  readonly levelNumber: number
  readonly minimumExp: number

  static {
    DomainEvent.derived.add(LevelDeletedDomainEvent.EVENT_NAME)
  }

  constructor (params: LevelDeletedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(LevelDeletedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
    this.levelNumber = params.levelNumber
    this.minimumExp = params.minimumExp
  }

  static fromAggregate (space: Level): LevelDeletedDomainEvent {
    return new LevelDeletedDomainEvent({
      id: space.id.valueOf(),
      communityId: space.communityId.valueOf(),
      levelNumber: space.levelNumber.valueOf(),
      minimumExp: space.minimumExp.valueOf()
    })
  }

  toPrimitive (): LevelDeletedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: LevelDeletedDomainEventBody, eventId: string, occurredOn: Date): LevelDeletedDomainEvent {
    return new LevelDeletedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
