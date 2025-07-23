import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import type { Action } from '../Action'
import type { Nullable } from '@Shared/domain/Nullable'
import type { AvailableActionType } from '../ValueObjects/ActionType'

type ActionCreatedDomainEventBody = {
  readonly id: string
  readonly communityId: string
  readonly productId: string
  readonly type: AvailableActionType
  readonly targetId: Nullable<string>
}

export class ActionCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.marketplace.action.v1.created'

  readonly id: string
  readonly communityId: string
  readonly productId: string
  readonly type: AvailableActionType
  readonly targetId: Nullable<string>

  static {
    DomainEvent.derived.add(ActionCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: ActionCreatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(ActionCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
    this.productId = params.productId
    this.type = params.type
    this.targetId = params.targetId
  }

  static fromAggregate (action: Action): ActionCreatedDomainEvent {
    return new ActionCreatedDomainEvent({
      id: action.id.valueOf(),
      productId: action.productId.valueOf(),
      communityId: action.communityId.valueOf(),
      type: action.type.valueOf(),
      targetId: action.targetId?.valueOf()
    })
  }

  toPrimitive (): ActionCreatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: ActionCreatedDomainEventBody, eventId: string, occurredOn: Date): ActionCreatedDomainEvent {
    return new ActionCreatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
