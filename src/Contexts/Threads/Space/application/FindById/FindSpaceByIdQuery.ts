import { Query } from '@Shared/domain/QueryBus/Query'

export class FindSpaceByIdQuery implements Query {
  constructor (
        readonly id: string
  ) {}
}
