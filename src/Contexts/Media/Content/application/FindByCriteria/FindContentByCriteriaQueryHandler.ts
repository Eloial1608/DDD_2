import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindContentByCriteriaQuery } from './FindContentByCriteriaQuery'
import { FinderByCriteria } from './FinderByCriteria'
import { Query } from '@Shared/domain/QueryBus/Query'
import { CriteriaHandler } from '@Shared/domain/Criteria/CriteriaHandler'
import { ContentCollectionResponse } from '../ContentCollectionResponse'

export class FindContentByCriteriaQueryHandler extends CriteriaHandler implements QueryHandler<FindContentByCriteriaQuery, ContentCollectionResponse> {
  constructor (private readonly finder: FinderByCriteria) {
    super()
  }

  subscribedTo (): Query {
    return FindContentByCriteriaQuery
  }

  async handle (data: FindContentByCriteriaQuery): Promise<ContentCollectionResponse> {
    return new ContentCollectionResponse(
      await this.finder.find(this.buildCriteria(data))
    )
  }
}
