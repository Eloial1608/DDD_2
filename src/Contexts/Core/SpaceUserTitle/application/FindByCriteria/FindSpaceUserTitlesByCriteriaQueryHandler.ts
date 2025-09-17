import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindSpaceUserTitlesByCriteriaQuery } from './FindSpaceUserTitlesByCriteriaQuery'
import { FinderByCriteria } from './FinderByCriteria'
import { Query } from '@Shared/domain/QueryBus/Query'
import { CriteriaHandler } from '@Shared/domain/Criteria/CriteriaHandler'
import { SpaceUserTitleCollectionResponse } from '../SpaceUserTitleCollectionResponse'

export class FindSpaceUserTitlesByCriteriaQueryHandler extends CriteriaHandler implements QueryHandler<FindSpaceUserTitlesByCriteriaQuery, SpaceUserTitleCollectionResponse> {
  constructor (private readonly finder: FinderByCriteria) {
    super()
  }

  subscribedTo (): Query {
    return FindSpaceUserTitlesByCriteriaQuery
  }

  async handle (data: FindSpaceUserTitlesByCriteriaQuery): Promise<SpaceUserTitleCollectionResponse> {
    return new SpaceUserTitleCollectionResponse(
      await this.finder.find(this.buildCriteria(data))
    )
  }
}
