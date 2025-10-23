import { Query } from '@Shared/domain/QueryBus/Query'

export class FindStatusByIdQuery implements Query {
  constructor (
        readonly id: string
  ) {}
}
