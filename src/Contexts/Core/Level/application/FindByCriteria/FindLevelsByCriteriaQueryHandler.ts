import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindLevelsByCriteriaQuery } from './FindLevelsByCriteriaQuery'
import { FinderByCriteria } from './FinderByCriteria'
import { Query } from '@Shared/domain/QueryBus/Query'
import { CriteriaHandler } from '@Shared/domain/Criteria/CriteriaHandler'
import { LevelCollectionResponse } from '../LevelCollectionResponse'

export class FindLevelsByCriteriaQueryHandler extends CriteriaHandler implements QueryHandler<FindLevelsByCriteriaQuery, LevelCollectionResponse> {
  constructor (private readonly finder: FinderByCriteria) {
    super()
  }

  subscribedTo (): Query {
    return FindLevelsByCriteriaQuery
  }

  async handle (data: FindLevelsByCriteriaQuery): Promise<LevelCollectionResponse> {
    return new LevelCollectionResponse(
      await this.finder.find(this.buildCriteria(data))
    )
  }
}
