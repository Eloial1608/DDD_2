import { Query } from '@Shared/domain/QueryBus/Query'

export class FindAccountMovementByIdQuery implements Query {
  constructor (
        readonly id: string
  ) {}
}
