import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { CardMovementResponse } from '../CardMovementResponse'
import { FinderById } from './FinderById'
import { FindCardMovementByIdQuery } from './FindCardMovementByIdQuery'
import { CardMovementId } from '@Core/CardMovement/domain/ValueObjects/CardMovementId'

export class FindCardMovementByIdQueryHandler
  implements QueryHandler<FindCardMovementByIdQuery, CardMovementResponse> {

  constructor(private readonly finder: FinderById) {}

  subscribedTo(): typeof FindCardMovementByIdQuery {
    return FindCardMovementByIdQuery
  }

  async handle(data: FindCardMovementByIdQuery): Promise<CardMovementResponse> {
    return new CardMovementResponse(
      await this.finder.find(
        new CardMovementId(data.id)
      )
    )
  }
}