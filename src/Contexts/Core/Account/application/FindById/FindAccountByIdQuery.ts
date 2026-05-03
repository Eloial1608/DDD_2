import { Query } from '@Shared/domain/QueryBus/Query'

export class FindAcountByIdQuery implements Query {
  constructor (
        readonly id: string
  ) {}
}
