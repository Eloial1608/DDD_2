import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindStripeProductByIdQuery } from './FindStripeProductByIdQuery'
import { StripeProductResponse } from '../StripeProductResponse'
import { FinderById } from './FinderById'
import { Query } from '@Shared/domain/QueryBus/Query'
import { Id } from '@Stripe/StripeProduct/domain/ValueObjects/Id'

export class FindStripeProductByIdQueryHandler implements QueryHandler<FindStripeProductByIdQuery, StripeProductResponse> {
  constructor (private readonly finder: FinderById) {}

  subscribedTo (): Query {
    return FindStripeProductByIdQuery
  }

  async handle (data: FindStripeProductByIdQuery): Promise<StripeProductResponse> {
    return new StripeProductResponse(
      await this.finder.find(
        new Id(data.id)
      )
    )
  }
}
