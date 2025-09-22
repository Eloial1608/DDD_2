import { Query } from '@Shared/domain/QueryBus/Query'

export class FindUserLevelByIdQuery implements Query {
  constructor (
    readonly id: string
  ) {}
}
