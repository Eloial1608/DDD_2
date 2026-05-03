import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindTransactionByIdQuery } from './FindTransactionByIdQuery'
import { TransactionResponse } from '../TransactionResponse'
import { FinderById } from './FinderById'
import { Query } from '@Shared/domain/QueryBus/Query'
import { Id } from '@Core/Transaction/domain/ValueObjects/Id'

export class FindTransactionByIdQueryHandler implements QueryHandler<FindTransactionByIdQuery, TransactionResponse> {
  constructor (private readonly finder: FinderById) {}

  subscribedTo (): Query {
    return FindTransactionByIdQuery
  }

  async handle (data: FindTransactionByIdQuery): Promise<TransactionResponse> {    
    return new TransactionResponse(
      await this.finder.find(
        new Id(data.id)
      )
    )
  }
}