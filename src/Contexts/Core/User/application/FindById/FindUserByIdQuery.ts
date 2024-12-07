import { Query } from '@Shared/domain/QueryBus/Query'

export class FindUserByIdQuery implements Query {
  constructor (
        readonly id: string
  ) {}
}
