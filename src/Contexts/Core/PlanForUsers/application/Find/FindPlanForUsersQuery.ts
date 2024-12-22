import { Query } from '@Shared/domain/QueryBus/Query'

export class FindPlanForUsersQuery implements Query {
  constructor (
        readonly id: string
  ) {}
}
