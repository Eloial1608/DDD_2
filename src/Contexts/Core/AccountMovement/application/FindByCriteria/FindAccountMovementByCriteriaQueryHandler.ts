import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindAccountMovementsByCriteriaQuery } from './FindAccountMovementByCriteriaQuery'
import { FinderByCriteria } from './FinderByCriteria'
import { Query } from '@Shared/domain/QueryBus/Query'
import { CriteriaHandler } from '@Shared/domain/Criteria/CriteriaHandler'
import { AccountMovementCollectionResponse } from '../AccountMovementCollectionResponse'

export class FindAccountMovementsByCriteriaQueryHandler extends CriteriaHandler implements QueryHandler<FindAccountMovementsByCriteriaQuery, AccountMovementCollectionResponse> {
  constructor (private readonly finder: FinderByCriteria) {
    super()
  }

  subscribedTo (): Query {
    return FindAccountMovementsByCriteriaQuery
  }

  async handle (data: FindAccountMovementsByCriteriaQuery): Promise<AccountMovementCollectionResponse> {
    return new AccountMovementCollectionResponse(
      await this.finder.find(this.buildCriteria(data))
    )
  }
}