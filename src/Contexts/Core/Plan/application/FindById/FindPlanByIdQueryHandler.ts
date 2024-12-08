import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindPlanByIdQuery } from './FindPlanByIdQuery'
import { PlanResponse } from '../PlanResponse'
import { FinderById } from './FinderById'
import { Query } from '@Shared/domain/QueryBus/Query'
import { Id } from '@Core/Plan/domain/ValueObjects/Id'

export class FindPlanByIdQueryHandler implements QueryHandler<FindPlanByIdQuery, PlanResponse> {
  constructor (private readonly finder: FinderById) {}

  subscribedTo (): Query {
    return FindPlanByIdQuery
  }

  async handle (data: FindPlanByIdQuery): Promise<PlanResponse> {
    return new PlanResponse(
      await this.finder.find(
        new Id(data.id)
      )
    )
  }
}
