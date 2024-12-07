import { Query } from '@Shared/domain/QueryBus/Query'

export class FindAccountByIdQuery implements Query {
  constructor (
        readonly id: string
  ) {}
}
