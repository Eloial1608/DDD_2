import { Query } from '@Shared/domain/QueryBus/Query'

export class FindPlanByIdQuery implements Query {
  constructor (
        readonly id: string
  ) {}
}
