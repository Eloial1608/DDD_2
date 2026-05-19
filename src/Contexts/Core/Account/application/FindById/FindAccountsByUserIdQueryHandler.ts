import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindAccountsByUserIdQuery } from './FindAccountsByUserIdQuery'
import { FinderByCriteria } from '../FindByCriteria/FinderByCriteria'
import { Query } from '@Shared/domain/QueryBus/Query'
import { CriteriaHandler } from '@Shared/domain/Criteria/CriteriaHandler'
import { AccountCollectionResponse } from '../AccountCollectionResponse'

export class FindAccountsByUserIdQueryHandler extends CriteriaHandler implements QueryHandler<FindAccountsByUserIdQuery, AccountCollectionResponse> {
  constructor (private readonly finder: FinderByCriteria) {
    super()
  }

  subscribedTo (): Query {
    return FindAccountsByUserIdQuery
  }

  async handle (data: FindAccountsByUserIdQuery): Promise<AccountCollectionResponse> {
    return new AccountCollectionResponse(
      await this.finder.find(this.buildCriteria(data))
    )
  }
}
