import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindPlanForUsersByCriteriaQuery } from './FindPlanForUsersByCriteriaQuery'
import { FinderByCriteria } from './FinderByCriteria'
import { Query } from '@Shared/domain/QueryBus/Query'
import { CriteriaHandler } from '@Shared/domain/Criteria/CriteriaHandler'
import { PlanForUsersCollectionResponse } from '../PlanForUsersCollectionResponse'

export class FindPlanForUsersByCriteriaQueryHandler extends CriteriaHandler implements QueryHandler<FindPlanForUsersByCriteriaQuery, PlanForUsersCollectionResponse> {
  constructor (private readonly finder: FinderByCriteria) {
    super()
  }

  subscribedTo (): Query {
    return FindPlanForUsersByCriteriaQuery
  }

  async handle (data: FindPlanForUsersByCriteriaQuery): Promise<PlanForUsersCollectionResponse> {
    return new PlanForUsersCollectionResponse(
      await this.finder.find(this.buildCriteria(data))
    )
  }
}
