import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindSpaceMembersByCriteriaQuery } from './FindSpaceMembersByCriteriaQuery'
import { FinderByCriteria } from './FinderByCriteria'
import { Query } from '@Shared/domain/QueryBus/Query'
import { CriteriaHandler } from '@Shared/domain/Criteria/CriteriaHandler'
import { SpaceMemberCollectionResponse } from '../SpaceMemberCollectionResponse'

export class FindSpaceMembersByCriteriaQueryHandler extends CriteriaHandler implements QueryHandler<FindSpaceMembersByCriteriaQuery, SpaceMemberCollectionResponse> {
  constructor (private readonly finder: FinderByCriteria) {
    super()
  }

  subscribedTo (): Query {
    return FindSpaceMembersByCriteriaQuery
  }

  async handle (data: FindSpaceMembersByCriteriaQuery): Promise<SpaceMemberCollectionResponse> {
    return new SpaceMemberCollectionResponse(
      await this.finder.find(this.buildCriteria(data))
    )
  }
}
