import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindStripeSessionByIdQuery } from './FindStripeSessionByIdQuery'
import { StripeSessionResponse } from '../StripeSessionResponse'
import { FinderById } from './FinderById'
import { Query } from '@Shared/domain/QueryBus/Query'
import { Id } from '@Stripe/StripeSession/domain/ValueObjects/Id'

export class FindStripeSessionByIdQueryHandler implements QueryHandler<FindStripeSessionByIdQuery, StripeSessionResponse> {
  constructor (private readonly finder: FinderById) {}

  subscribedTo (): Query {
    return FindStripeSessionByIdQuery
  }

  async handle (data: FindStripeSessionByIdQuery): Promise<StripeSessionResponse> {
    return new StripeSessionResponse(
      await this.finder.find(
        new Id(data.id)
      )
    )
  }
}
