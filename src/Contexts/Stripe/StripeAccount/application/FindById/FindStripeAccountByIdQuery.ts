import { Query } from '@Shared/domain/QueryBus/Query'

export class FindStripeAccountByIdQuery implements Query {
  constructor (
        readonly id: string
  ) {}
}
