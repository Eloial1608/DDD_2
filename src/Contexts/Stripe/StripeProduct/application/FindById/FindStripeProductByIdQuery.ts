import { Query } from '@Shared/domain/QueryBus/Query'

export class FindStripeProductByIdQuery implements Query {
  constructor (
        readonly id: string
  ) {}
}
