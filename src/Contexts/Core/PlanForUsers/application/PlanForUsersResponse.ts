import { Nullable } from '@Shared/domain/Nullable'
import { PlanForUsers } from '../domain/PlanForUsers'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'

export type PlanForUsersResponseBody = {
  readonly id: string
  readonly name: string
  readonly description: Nullable<string>
  readonly renovationInterval: number
  readonly renovationType: string
  readonly price: {
    value: number
    currency: string
  }
  readonly communityId: string
  readonly createdAt: Date
  readonly updatedAt: Date
}

export class PlanForUsersResponse implements QueryResponse<PlanForUsersResponseBody> {
  response: PlanForUsersResponseBody

  constructor (planForUsers: PlanForUsers) {
    this.response = {
      id: planForUsers.id.valueOf(),
      name: planForUsers.name.valueOf(),
      description: planForUsers.description?.valueOf(),
      renovationInterval: planForUsers.renovationInterval.valueOf(),
      renovationType: planForUsers.renovationType.valueOf(),
      communityId: planForUsers.communityId.valueOf(),
      price: {
        value: planForUsers.price.value.valueOf(),
        currency: planForUsers.price.currency.valueOf()
      },
      createdAt: planForUsers.createdAt.valueOf(),
      updatedAt: planForUsers.updatedAt.valueOf()
    }
  }
}
