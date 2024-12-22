import { Query } from '@Shared/domain/QueryBus/Query'

export class FindStripeSessionByIdQuery implements Query {
  constructor (
        readonly id: string
  ) {}
}
