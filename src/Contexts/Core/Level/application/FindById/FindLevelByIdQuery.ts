import { Query } from '@Shared/domain/QueryBus/Query'

export class FindLevelByIdQuery implements Query {
  constructor (
        readonly id: string
  ) {}
}
