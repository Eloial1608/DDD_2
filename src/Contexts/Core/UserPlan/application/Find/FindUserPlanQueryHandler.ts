import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindUserPlanQuery } from './FindUserPlanQuery'
import { UserPlanResponse } from '../UserPlanResponse'
import { FinderById } from './FinderById'
import { Query } from '@Shared/domain/QueryBus/Query'
import { Id } from '@Core/UserPlan/domain/ValueObjects/Id'

export class FindUserPlanQueryHandler implements QueryHandler<FindUserPlanQuery, UserPlanResponse> {
  constructor (private readonly finder: FinderById) {}

  subscribedTo (): Query {
    return FindUserPlanQuery
  }

  async handle (data: FindUserPlanQuery): Promise<UserPlanResponse> {
    return new UserPlanResponse(
      await this.finder.find(
        new Id(data.id)
      )
    )
  }
}
