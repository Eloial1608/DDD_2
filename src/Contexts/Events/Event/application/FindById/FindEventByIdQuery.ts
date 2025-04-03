import { Query } from '@Shared/domain/QueryBus/Query'

export class FindEventByIdQuery implements Query {
  constructor (
        readonly id: string
  ) {}
}
