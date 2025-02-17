import { Query } from '@Shared/domain/QueryBus/Query'

export class FindMediaByIdQuery implements Query {
  constructor (
        readonly id: string
  ) {}
}
