import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindCommunityConfigurationByCriteriaQuery } from './FindCommunityConfigurationByCriteriaQuery'
import { FinderByCriteria } from './FinderByCriteria'
import { Query } from '@Shared/domain/QueryBus/Query'
import { CriteriaHandler } from '@Shared/domain/Criteria/CriteriaHandler'
import { CommunityConfigurationCollectionResponse } from '../CommunityConfigurationCollectionResponse'

export class FindCommunityConfigurationsByCriteriaQueryHandler extends CriteriaHandler implements QueryHandler<FindCommunityConfigurationByCriteriaQuery, CommunityConfigurationCollectionResponse> {
  constructor (private readonly finder: FinderByCriteria) {
    super()
  }

  subscribedTo (): Query {
    return FindCommunityConfigurationByCriteriaQuery
  }

  async handle (data: FindCommunityConfigurationByCriteriaQuery): Promise<CommunityConfigurationCollectionResponse> {
    return new CommunityConfigurationCollectionResponse(
      await this.finder.find(this.buildCriteria(data))
    )
  }
}
