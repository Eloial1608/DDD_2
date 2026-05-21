import { Query } from '@Shared/domain/QueryBus/Query'

export class FindCardsByUserIdQuery implements Query {
  constructor (readonly userId: string) {}
}
