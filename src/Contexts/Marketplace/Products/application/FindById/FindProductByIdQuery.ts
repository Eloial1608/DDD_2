import { Query } from '@Shared/domain/QueryBus/Query'

export class FindProductByIdQuery implements Query {
  constructor (
        readonly id: string
  ) {}
}
