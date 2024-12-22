import { UserPlan } from '../domain/UserPlan'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'

export type UserPlanResponseBody = {
  readonly id: string
  readonly name: string
  readonly renovationInterval: number
  readonly renovationType: string
  readonly expiresAt: Date
  readonly createdAt: Date
  readonly updatedAt: Date
}

export class UserPlanResponse implements QueryResponse<UserPlanResponseBody> {
  response: UserPlanResponseBody

  constructor (userPlan: UserPlan) {
    this.response = {
      id: userPlan.id.valueOf(),
      name: userPlan.name.valueOf(),
      renovationInterval: userPlan.renovationInterval.valueOf(),
      renovationType: userPlan.renovationType.valueOf(),
      expiresAt: userPlan.expiresAt.valueOf(),
      createdAt: userPlan.createdAt.valueOf(),
      updatedAt: userPlan.updatedAt.valueOf()
    }
  }
}
