import { UserPlan } from '../domain/UserPlan'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { UserPlanResponse, UserPlanResponseBody } from './UserPlanResponse'

export class UserPlanCollectionResponse implements QueryResponse<Array<UserPlanResponseBody>> {
  response: Array<UserPlanResponseBody>

  constructor (userPlan: Array<UserPlan>) {
    this.response = userPlan.map(x => new UserPlanResponse(x).response)
  }
}
