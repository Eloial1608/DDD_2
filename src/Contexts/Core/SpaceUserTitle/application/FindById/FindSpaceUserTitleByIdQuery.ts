import { Query } from '@Shared/domain/QueryBus/Query'

export class FindSpaceUserTitleByIdQuery implements Query {
  constructor (
        readonly id: string
  ) {}
}
