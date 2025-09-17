import { Query } from '@Shared/domain/QueryBus/Query'

export class FindUserTitleByIdQuery implements Query {
  constructor (
        readonly id: string
  ) {}
}
