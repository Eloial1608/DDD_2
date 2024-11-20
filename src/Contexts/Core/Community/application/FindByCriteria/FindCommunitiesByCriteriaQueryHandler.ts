import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindCommunitiesByCriteriaQuery } from './FindCommunitiesByCriteriaQuery'
import { FinderByCriteria } from './FinderByCriteria'
import { Query } from '@Shared/domain/QueryBus/Query'
import { CriteriaHandler } from '@Shared/domain/Criteria/CriteriaHandler'
import { CommunityCollectionResponse } from '../CommunityCollectionResponse'

export class FindCommunitiesByCriteriaQueryHandler extends CriteriaHandler implements QueryHandler<FindCommunitiesByCriteriaQuery, CommunityCollectionResponse> {
  constructor (private readonly finder: FinderByCriteria) {
    super()
  }

  subscribedTo (): Query {
    return FindCommunitiesByCriteriaQuery
  }

  async handle (data: FindCommunitiesByCriteriaQuery): Promise<CommunityCollectionResponse> {
    return new CommunityCollectionResponse(
      await this.finder.find(this.buildCriteria(data))
    )
  }
}
