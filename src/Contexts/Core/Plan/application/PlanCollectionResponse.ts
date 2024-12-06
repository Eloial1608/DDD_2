import { Plan } from '../domain/Plan'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { PlanResponse, PlanResponseBody } from './PlanResponse'

export class PlanCollectionResponse implements QueryResponse<Array<PlanResponseBody>> {
  response: Array<PlanResponseBody>

  constructor (plan: Array<Plan>) {
    this.response = plan.map(x => new PlanResponse(x).response)
  }
}
