import { Query } from '@Shared/domain/QueryBus/Query'

export class FindCardMovementByIdQuery implements Query {
  constructor(readonly id: string) {}
}
