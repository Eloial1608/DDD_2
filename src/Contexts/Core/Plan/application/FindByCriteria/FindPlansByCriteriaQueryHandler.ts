import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindPlansByCriteriaQuery } from './FindPlansByCriteriaQuery'
import { FinderByCriteria } from './FinderByCriteria'
import { Query } from '@Shared/domain/QueryBus/Query'
import { CriteriaHandler } from '@Shared/domain/Criteria/CriteriaHandler'
import { PlanCollectionResponse } from '../PlanCollectionResponse'

export class FindPlansByCriteriaQueryHandler extends CriteriaHandler implements QueryHandler<FindPlansByCriteriaQuery, PlanCollectionResponse> {
  constructor (private readonly finder: FinderByCriteria) {
    super()
  }

  subscribedTo (): Query {
    return FindPlansByCriteriaQuery
  }

  async handle (data: FindPlansByCriteriaQuery): Promise<PlanCollectionResponse> {
    return new PlanCollectionResponse(
      await this.finder.find(this.buildCriteria(data))
    )
  }
}
