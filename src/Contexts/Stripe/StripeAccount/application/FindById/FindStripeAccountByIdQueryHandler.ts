import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindStripeAccountByIdQuery } from './FindStripeAccountByIdQuery'
import { StripeAccountResponse } from '../StripeAccountResponse'
import { FinderById } from './FinderById'
import { Query } from '@Shared/domain/QueryBus/Query'
import { Id } from '@Stripe/StripeAccount/domain/ValueObjects/Id'

export class FindStripeAccountByIdQueryHandler implements QueryHandler<FindStripeAccountByIdQuery, StripeAccountResponse> {
  constructor (private readonly finder: FinderById) {}

  subscribedTo (): Query {
    return FindStripeAccountByIdQuery
  }

  async handle (data: FindStripeAccountByIdQuery): Promise<StripeAccountResponse> {
    return new StripeAccountResponse(
      await this.finder.find(
        new Id(data.id)
      )
    )
  }
}
