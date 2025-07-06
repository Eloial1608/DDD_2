import { Query } from '@Shared/domain/QueryBus/Query'

export class FindProjectByIdQuery implements Query {
  constructor (
        readonly id: string
  ) {}
}
