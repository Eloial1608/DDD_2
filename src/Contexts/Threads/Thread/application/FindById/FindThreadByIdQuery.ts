import { Query } from '@Shared/domain/QueryBus/Query'

export class FindThreadByIdQuery implements Query {
  constructor (
        readonly id: string
  ) {}
}
