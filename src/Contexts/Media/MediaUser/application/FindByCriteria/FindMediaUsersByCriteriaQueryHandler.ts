import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindMediaUsersByCriteriaQuery } from './FindMediaUsersByCriteriaQuery'
import { FinderByCriteria } from './FinderByCriteria'
import { Query } from '@Shared/domain/QueryBus/Query'
import { CriteriaHandler } from '@Shared/domain/Criteria/CriteriaHandler'
import { MediaUserCollectionResponse } from '../MediaUserCollectionResponse'

export class FindMediaUsersByCriteriaQueryHandler extends CriteriaHandler implements QueryHandler<FindMediaUsersByCriteriaQuery, MediaUserCollectionResponse> {
  constructor (private readonly finder: FinderByCriteria) {
    super()
  }

  subscribedTo (): Query {
    return FindMediaUsersByCriteriaQuery
  }

  async handle (data: FindMediaUsersByCriteriaQuery): Promise<MediaUserCollectionResponse> {
    return new MediaUserCollectionResponse(
      await this.finder.find(this.buildCriteria(data))
    )
  }
}
