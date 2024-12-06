import { Plan } from '../domain/Plan'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'

export type PlanResponseBody = {
    readonly id: string
    readonly name: string
    readonly description: string
    readonly price: {
      value: number
      currency: string
    }
    readonly allowedFeatures: string[]
    readonly allowedUsers: number
    readonly renovationInterval: number
    readonly renovationType: string
    readonly createdAt: Date
    readonly updatedAt: Date
}

export class PlanResponse implements QueryResponse<PlanResponseBody> {
  response: PlanResponseBody

  constructor (plan: Plan) {
    this.response = {
      id: plan.id.valueOf(),
      name: plan.name.valueOf(),
      description: plan.description.valueOf(),
      price: {
        value: plan.price.value.valueOf(),
        currency: plan.price.currency.valueOf()
      },
      allowedFeatures: plan.allowedFeatures.valueOf().map(x => x.valueOf()),
      allowedUsers: plan.allowedUsers.valueOf(),
      renovationInterval: plan.renovationInterval.valueOf(),
      renovationType: plan.renovationType.valueOf(),
      createdAt: plan.createdAt.valueOf(),
      updatedAt: plan.updatedAt.valueOf()
    }
  }
}
