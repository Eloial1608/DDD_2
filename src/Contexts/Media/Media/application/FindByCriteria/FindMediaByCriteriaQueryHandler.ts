import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindMediaByCriteriaQuery } from './FindMediaByCriteriaQuery'
import { FinderByCriteria } from './FinderByCriteria'
import { Query } from '@Shared/domain/QueryBus/Query'
import { CriteriaHandler } from '@Shared/domain/Criteria/CriteriaHandler'
import { MediaCollectionResponse } from '../MediaCollectionResponse'

export class FindMediaByCriteriaQueryHandler extends CriteriaHandler implements QueryHandler<FindMediaByCriteriaQuery, MediaCollectionResponse> {
  constructor (private readonly finder: FinderByCriteria) {
    super()
  }

  subscribedTo (): Query {
    return FindMediaByCriteriaQuery
  }

  async handle (data: FindMediaByCriteriaQuery): Promise<MediaCollectionResponse> {
    return new MediaCollectionResponse(
      await this.finder.find(this.buildCriteria(data))
    )
  }
}
