import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindTransactionsByCriteriaQuery } from './FindTransactionsByCriteriaQuery'
import { FinderByCriteria } from './FinderByCriteria'
import { Query } from '@Shared/domain/QueryBus/Query'
import { CriteriaHandler } from '@Shared/domain/Criteria/CriteriaHandler'
import { TransactionCollectionResponse } from '../TransactionCollectionResponse'

export class FindTransactionsByCriteriaQueryHandler extends CriteriaHandler implements QueryHandler<FindTransactionsByCriteriaQuery, TransactionCollectionResponse> {
  constructor (private readonly finder: FinderByCriteria) {
    super()
  }

  subscribedTo (): Query {
    return FindTransactionsByCriteriaQuery
  }

  async handle (data: FindTransactionsByCriteriaQuery): Promise<TransactionCollectionResponse> {
    return new TransactionCollectionResponse(
      await this.finder.find(this.buildCriteria(data))
    )
  }
}