import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindTitlesByCriteriaQuery } from './FindTitlesByCriteriaQuery'
import { FinderByCriteria } from './FinderByCriteria'
import { Query } from '@Shared/domain/QueryBus/Query'
import { CriteriaHandler } from '@Shared/domain/Criteria/CriteriaHandler'
import { TitleCollectionResponse } from '../TitleCollectionResponse'

export class FindTitlesByCriteriaQueryHandler extends CriteriaHandler implements QueryHandler<FindTitlesByCriteriaQuery, TitleCollectionResponse> {
  constructor (private readonly finder: FinderByCriteria) {
    super()
  }

  subscribedTo (): Query {
    return FindTitlesByCriteriaQuery
  }

  async handle (data: FindTitlesByCriteriaQuery): Promise<TitleCollectionResponse> {
    return new TitleCollectionResponse(
      await this.finder.find(this.buildCriteria(data))
    )
  }
}
