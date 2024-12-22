import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindPlanForUsersQuery } from './FindPlanForUsersQuery'
import { PlanForUsersResponse } from '../PlanForUsersResponse'
import { FinderById } from './FinderById'
import { Query } from '@Shared/domain/QueryBus/Query'
import { Id } from '@Core/PlanForUsers/domain/ValueObjects/Id'

export class FindPlanForUsersQueryHandler implements QueryHandler<FindPlanForUsersQuery, PlanForUsersResponse> {
  constructor (private readonly finder: FinderById) {}

  subscribedTo (): Query {
    return FindPlanForUsersQuery
  }

  async handle (data: FindPlanForUsersQuery): Promise<PlanForUsersResponse> {
    return new PlanForUsersResponse(
      await this.finder.find(
        new Id(data.id)
      )
    )
  }
}
