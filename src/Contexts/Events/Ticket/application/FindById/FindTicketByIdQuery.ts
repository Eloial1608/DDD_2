import { Query } from '@Shared/domain/QueryBus/Query'

export class FindTicketByIdQuery implements Query {
  constructor (
        readonly id: string
  ) {}
}
