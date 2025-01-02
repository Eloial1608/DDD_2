import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindPostsByCriteriaQuery } from './FindPostsByCriteriaQuery'
import { FinderByCriteria } from './FinderByCriteria'
import { Query } from '@Shared/domain/QueryBus/Query'
import { CriteriaHandler } from '@Shared/domain/Criteria/CriteriaHandler'
import { PostCollectionResponse } from '../PostCollectionResponse'

export class FindPostsByCriteriaQueryHandler extends CriteriaHandler implements QueryHandler<FindPostsByCriteriaQuery, PostCollectionResponse> {
  constructor (private readonly finder: FinderByCriteria) {
    super()
  }

  subscribedTo (): Query {
    return FindPostsByCriteriaQuery
  }

  async handle (data: FindPostsByCriteriaQuery): Promise<PostCollectionResponse> {
    return new PostCollectionResponse(
      await this.finder.find(this.buildCriteria(data))
    )
  }
}
