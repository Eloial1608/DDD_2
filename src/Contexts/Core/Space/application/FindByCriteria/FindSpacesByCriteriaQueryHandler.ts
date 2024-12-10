import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindSpacesByCriteriaQuery } from './FindSpacesByCriteriaQuery'
import { FinderByCriteria } from './FinderByCriteria'
import { Query } from '@Shared/domain/QueryBus/Query'
import { CriteriaHandler } from '@Shared/domain/Criteria/CriteriaHandler'
import { SpaceCollectionResponse } from '../SpaceCollectionResponse'

export class FindSpacesByCriteriaQueryHandler extends CriteriaHandler implements QueryHandler<FindSpacesByCriteriaQuery, SpaceCollectionResponse> {
  constructor (private readonly finder: FinderByCriteria) {
    super()
  }

  subscribedTo (): Query {
    return FindSpacesByCriteriaQuery
  }

  async handle (data: FindSpacesByCriteriaQuery): Promise<SpaceCollectionResponse> {
    return new SpaceCollectionResponse(
      await this.finder.find(this.buildCriteria(data))
    )
  }
}
