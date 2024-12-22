import { Query } from '@Shared/domain/QueryBus/Query'

export class FindUserPlanQuery implements Query {
  constructor (
        readonly id: string
  ) {}
}
