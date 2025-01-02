import { Query } from '@Shared/domain/QueryBus/Query'

export class FindPostByIdQuery implements Query {
  constructor (
        readonly id: string
  ) {}
}
