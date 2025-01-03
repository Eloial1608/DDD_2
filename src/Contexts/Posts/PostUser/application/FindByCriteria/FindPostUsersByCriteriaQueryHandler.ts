import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindPostUsersByCriteriaQuery } from './FindPostUsersByCriteriaQuery'
import { FinderByCriteria } from './FinderByCriteria'
import { Query } from '@Shared/domain/QueryBus/Query'
import { CriteriaHandler } from '@Shared/domain/Criteria/CriteriaHandler'
import { PostUserCollectionResponse } from '../PostUserCollectionResponse'

export class FindPostUsersByCriteriaQueryHandler extends CriteriaHandler implements QueryHandler<FindPostUsersByCriteriaQuery, PostUserCollectionResponse> {
  constructor (private readonly finder: FinderByCriteria) {
    super()
  }

  subscribedTo (): Query {
    return FindPostUsersByCriteriaQuery
  }

  async handle (data: FindPostUsersByCriteriaQuery): Promise<PostUserCollectionResponse> {
    return new PostUserCollectionResponse(
      await this.finder.find(this.buildCriteria(data))
    )
  }
}
