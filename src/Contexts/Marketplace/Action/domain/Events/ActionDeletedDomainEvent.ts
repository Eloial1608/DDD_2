import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import type { Action } from '../Action'
import type { Nullable } from '@Shared/domain/Nullable'
import type { AvailableActionType } from '../ValueObjects/ActionType'

type ActionDeletedDomainEventBody = {
  readonly id: string
  readonly communityId: string
  readonly productId: string
  readonly type: AvailableActionType
  readonly targetId: Nullable<string>
}

export class ActionDeletedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.marketplace.action.v1.deleted'

  readonly id: string
  readonly communityId: string
  readonly productId: string
  readonly type: AvailableActionType
  readonly targetId: Nullable<string>

  static {
    DomainEvent.derived.add(ActionDeletedDomainEvent.EVENT_NAME)
  }

  constructor (params: ActionDeletedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(ActionDeletedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
    this.productId = params.productId
    this.type = params.type
    this.targetId = params.targetId
  }

  static fromAggregate (action: Action): ActionDeletedDomainEvent {
    return new ActionDeletedDomainEvent({
      id: action.id.valueOf(),
      productId: action.productId.valueOf(),
      communityId: action.communityId.valueOf(),
      type: action.type.valueOf(),
      targetId: action.targetId?.valueOf()
    })
  }

  toPrimitive (): ActionDeletedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: ActionDeletedDomainEventBody, eventId: string, occurredOn: Date): ActionDeletedDomainEvent {
    return new ActionDeletedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
