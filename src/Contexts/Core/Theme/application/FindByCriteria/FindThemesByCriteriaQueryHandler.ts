import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindThemesByCriteriaQuery } from './FindThemesByCriteriaQuery'
import { FinderByCriteria } from './FinderByCriteria'
import { Query } from '@Shared/domain/QueryBus/Query'
import { CriteriaHandler } from '@Shared/domain/Criteria/CriteriaHandler'
import { ThemeCollectionResponse } from '../ThemeCollectionResponse'

export class FindThemesByCriteriaQueryHandler extends CriteriaHandler implements QueryHandler<FindThemesByCriteriaQuery, ThemeCollectionResponse> {
  constructor (private readonly finder: FinderByCriteria) {
    super()
  }

  subscribedTo (): Query {
    return FindThemesByCriteriaQuery
  }

  async handle (data: FindThemesByCriteriaQuery): Promise<ThemeCollectionResponse> {
    return new ThemeCollectionResponse(
      await this.finder.find(this.buildCriteria(data))
    )
  }
}
