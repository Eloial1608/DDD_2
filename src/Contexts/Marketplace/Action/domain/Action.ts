import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { ActionCreatedDomainEvent } from './Events/ActionCreatedDomainEvent'
import { ActionDeletedDomainEvent } from './Events/ActionDeletedDomainEvent'
import type { Id } from './ValueObjects/Id'
import type { CommunityId } from './ValueObjects/CommunityId'
import type { ProductId } from './ValueObjects/ProductId'
import type { ActionType } from './ValueObjects/ActionType'
import type { Nullable } from '@Shared/domain/Nullable'
import type { TargetId } from './ValueObjects/TargetId'

export class Action extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly communityId: CommunityId,
        readonly productId: ProductId,
        readonly type: ActionType,
        readonly targetId: Nullable<TargetId>
  ) {
    super()
  }

  static create (
    id: Id,
    communityId: CommunityId,
    productId: ProductId,
    type: ActionType,
    targetId: Nullable<TargetId>
  ): Action {
    const action = new Action(
      id,
      communityId,
      productId,
      type,
      targetId
    )

    action.record(ActionCreatedDomainEvent.fromAggregate(action))

    return action
  }

  delete (): Action {
    const action = new Action(
      this.id,
      this.communityId,
      this.productId,
      this.type,
      this.targetId
    )

    action.record(ActionDeletedDomainEvent.fromAggregate(action))

    return action
  }
}
