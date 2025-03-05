import { Query } from '@Shared/domain/QueryBus/Query'

export class FindContentByIdQuery implements Query {
  constructor (
        readonly id: string
  ) {}
}
