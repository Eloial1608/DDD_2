import { Query } from '@Shared/domain/QueryBus/Query'

export class FindCommentByIdQuery implements Query {
  constructor (
        readonly id: string
  ) {}
}
