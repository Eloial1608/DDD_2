import { PlanForUsers } from '../domain/PlanForUsers'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { PlanForUsersResponse, PlanForUsersResponseBody } from './PlanForUsersResponse'

export class PlanForUsersCollectionResponse implements QueryResponse<Array<PlanForUsersResponseBody>> {
  response: Array<PlanForUsersResponseBody>

  constructor (planForUsers: Array<PlanForUsers>) {
    this.response = planForUsers.map(x => new PlanForUsersResponse(x).response)
  }
}
