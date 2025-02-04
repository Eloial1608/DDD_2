import { Query } from '@Shared/domain/QueryBus/Query'

export class FindFormByIdQuery implements Query {
  constructor (
        readonly id: string
  ) {}
}
