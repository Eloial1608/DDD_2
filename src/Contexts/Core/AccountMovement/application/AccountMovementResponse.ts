import { AccountMovement } from '@Core/AccountMovement/domain/AccountMovement'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'

export type AccountMovementResponseBody = {
  readonly id: string
  readonly transferId: string
  readonly accountId: string
  readonly amount: number
  readonly type: string
  readonly description: string
  readonly relatedAccountId: string | null
  readonly cardId: string | null
  readonly createdAt: Date
}

export class AccountMovementResponse implements QueryResponse<AccountMovementResponseBody> {
  response: AccountMovementResponseBody

  constructor(movement: AccountMovement) {
    this.response = {
      id: movement.id.valueOf(),
      transferId: movement.transferId.valueOf(),
      accountId: movement.accountId.valueOf(),
      amount: movement.amount.valueOf(),
      type: movement.type.valueOf(),
      description: movement.description.valueOf(),
      relatedAccountId: movement.relatedAccountId?.valueOf() ?? null,
      cardId: movement.cardId?.valueOf() ?? null,
      createdAt: movement.createdAt.valueOf()
    }
  }
}