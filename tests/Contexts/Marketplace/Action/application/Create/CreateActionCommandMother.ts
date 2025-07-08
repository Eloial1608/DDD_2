import type { Nullable } from '@Shared/domain/Nullable'
import { CreateActionCommand } from '@Marketplace/Action/application/Create/CreateActionCommand'
import type { Action } from '@Marketplace/Action/domain/Action'
import type { AvailableActionType } from '@Marketplace/Action/domain/ValueObjects/ActionType'

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class CreateActionCommandMother {
  static create (
    id: string,
    communityId: string,
    productId: string,
    type: AvailableActionType,
    targetId: Nullable<string>
  ): CreateActionCommand {
    return new CreateActionCommand(
      id,
      communityId,
      productId,
      type,
      targetId
    )
  }

  static fromAggregate (action: Action): CreateActionCommand {
    // biome-ignore lint/complexity/noThisInStatic: <explanation>
    return this.create(
      action.id.valueOf(),
      action.communityId.valueOf(),
      action.productId.valueOf(),
      action.type.valueOf(),
      action.targetId?.valueOf()
    )
  }
}
