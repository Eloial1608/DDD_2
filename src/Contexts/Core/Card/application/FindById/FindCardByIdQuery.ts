import { Query } from '@Shared/domain/QueryBus/Query'

export class FindCardByIdQuery implements Query {
  constructor (
        readonly id: string
  ) {}
}
