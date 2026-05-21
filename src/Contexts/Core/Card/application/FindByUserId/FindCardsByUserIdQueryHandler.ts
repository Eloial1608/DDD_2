import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FinderByUserId } from './FinderByUserId'
import { CardCollectionResponse } from '../CardCollectionResponse'
import { FindCardsByUserIdQuery } from './FindCardsByUserIdQuery'
import { UserId } from '@Core/Account/domain/ValueObjects/UserId'

export class FindCardsByUserIdQueryHandler implements QueryHandler<FindCardsByUserIdQuery, CardCollectionResponse> {
  constructor (private readonly finder: FinderByUserId) {}

  subscribedTo (): typeof FindCardsByUserIdQuery {
    return FindCardsByUserIdQuery
  }

  async handle (query: FindCardsByUserIdQuery): Promise<CardCollectionResponse> {
    const userId = new UserId(query.userId)
    const cards = await this.finder.find(userId)
    return new CardCollectionResponse(cards)
  }
}
