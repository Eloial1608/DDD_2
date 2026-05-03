import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindAccountByCriteriaQuery } from './FindAccountByCriteriaQuery'
import { FinderByCriteria } from './FinderByCriteria'
import { Query } from '@Shared/domain/QueryBus/Query'
import { CriteriaHandler } from '@Shared/domain/Criteria/CriteriaHandler'
import { AccountCollectionResponse } from '../AccountCollectionResponse'

export class FindAccountsByCriteriaQueryHandler extends CriteriaHandler implements QueryHandler<FindAccountByCriteriaQuery, AccountCollectionResponse> {
  constructor (private readonly finder: FinderByCriteria) {
    super()
  }

  subscribedTo (): Query {
    return FindAccountByCriteriaQuery
  }

  async handle (data: FindAccountByCriteriaQuery): Promise<AccountCollectionResponse> {
    return new AccountCollectionResponse(
      await this.finder.find(this.buildCriteria(data))
    )
  }
}