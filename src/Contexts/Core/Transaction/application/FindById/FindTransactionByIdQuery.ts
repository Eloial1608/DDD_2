import { Query } from '@Shared/domain/QueryBus/Query'

export class FindTransactionByIdQuery implements Query {
  constructor (
        readonly id: string
  ) {}
}
