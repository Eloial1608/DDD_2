import { Query } from '@Shared/domain/QueryBus/Query'

export class FindTitleByIdQuery implements Query {
  constructor (
        readonly id: string
  ) {}
}
