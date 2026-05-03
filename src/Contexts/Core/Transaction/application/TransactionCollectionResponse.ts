import { Transaction } from '../domain/Transaction'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { TransactionResponse, TransactionResponseBody } from './TransactionResponse'

export class TransactionCollectionResponse implements QueryResponse<Array<TransactionResponseBody>> {
  response: Array<TransactionResponseBody>

  constructor (transaction: Array<Transaction>) {
    this.response = transaction.map(x => new TransactionResponse(x).response)
  }
}
