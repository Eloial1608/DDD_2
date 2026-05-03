import { Transaction } from '@Core/Transaction/domain/Transaction'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'

export type TransactionResponseBody = {
  readonly id: string
  readonly fromAccountId: string | null
  readonly toAccountId: string | null
  readonly balance: number
  readonly concept: string | null
  readonly reference: string | null
  readonly status: string
  readonly createdAt: Date
}

export class TransactionResponse implements QueryResponse<TransactionResponseBody> {
  response: TransactionResponseBody

  constructor(transaction: Transaction) {
    this.response = {
      id: transaction.id.valueOf(),

      fromAccountId: transaction.fromAccountId?.valueOf() ?? null,
      toAccountId: transaction.toAccountId?.valueOf() ?? null,

      balance: transaction.balance.valueOf(),

      concept: transaction.concept?.valueOf() ?? null,
      reference: transaction.reference?.valueOf() ?? null,

      status: transaction.status.valueOf(),

      createdAt: transaction.createdAt.valueOf()
    }
  }
}