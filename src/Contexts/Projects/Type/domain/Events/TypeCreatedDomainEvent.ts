import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Type } from '../Type'
import { Nullable } from '@Shared/domain/Nullable'

type TypeCreatedDomainEventBody = {
    readonly id: string
    readonly projectId: Nullable<string>
    readonly createdAt: Date
}

export class TypeCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.projects.type.v1.created'

  readonly id: string
  readonly projectId: Nullable<string>
  readonly createdAt: Date

  static {
    DomainEvent.derived.add(TypeCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: TypeCreatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(TypeCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.projectId = params.projectId
    this.createdAt = params.createdAt
  }

  static fromAggregate (type: Type): TypeCreatedDomainEvent {
    return new TypeCreatedDomainEvent({
      id: type.id.valueOf(),
      projectId: type.projectId ? type.projectId.valueOf() : null,
      createdAt: type.createdAt.valueOf()

    })
  }

  toPrimitive (): TypeCreatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: TypeCreatedDomainEventBody, eventId: string, occurredOn: Date): TypeCreatedDomainEvent {
    return new TypeCreatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
