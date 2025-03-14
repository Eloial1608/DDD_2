import { Query } from '@Shared/domain/QueryBus/Query'

export class FindLikeByIdQuery implements Query {
  constructor (
        readonly id: string
  ) {}
}
