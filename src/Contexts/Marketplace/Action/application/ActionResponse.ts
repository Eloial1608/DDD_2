import type { Action } from '../domain/Action'
import type { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import type { Nullable } from '@Shared/domain/Nullable'
import type { AvailableActionType } from '../domain/ValueObjects/ActionType'

export type ActionResponseBody = {
  readonly id: string
  readonly communityId: string
  readonly productId: string
  readonly type: AvailableActionType
  readonly targetId: Nullable<string>
}

export class ActionResponse implements QueryResponse<ActionResponseBody> {
  response: ActionResponseBody

  constructor (action: Action) {
    this.response = {
      id: action.id.valueOf(),
      communityId: action.communityId.valueOf(),
      productId: action.productId.valueOf(),
      type: action.type.valueOf(),
      targetId: action.targetId?.valueOf()
    }
  }
}
