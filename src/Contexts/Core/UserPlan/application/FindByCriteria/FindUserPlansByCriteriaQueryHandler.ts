import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindUserPlansByCriteriaQuery } from './FindUserPlansByCriteriaQuery'
import { FinderByCriteria } from './FinderByCriteria'
import { Query } from '@Shared/domain/QueryBus/Query'
import { CriteriaHandler } from '@Shared/domain/Criteria/CriteriaHandler'
import { UserPlanCollectionResponse } from '../UserPlanCollectionResponse'

export class FindUserPlansByCriteriaQueryHandler extends CriteriaHandler implements QueryHandler<FindUserPlansByCriteriaQuery, UserPlanCollectionResponse> {
  constructor (private readonly finder: FinderByCriteria) {
    super()
  }

  subscribedTo (): Query {
    return FindUserPlansByCriteriaQuery
  }

  async handle (data: FindUserPlansByCriteriaQuery): Promise<UserPlanCollectionResponse> {
    return new UserPlanCollectionResponse(
      await this.finder.find(this.buildCriteria(data))
    )
  }
}
